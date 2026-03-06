import React, { useRef } from 'react';
import { FiUser, FiCamera } from 'react-icons/fi';
import toast from 'react-hot-toast';
import apiClient from '@/api/axios';
import {
  AvatarWrapper,
  Avatar,
  AvatarPlaceholder,
  AvatarUploadButton,
} from './UserAvatar.styled';

interface UserAvatarProps {
  avatarUrl?: string;
  onUpload?: (data: { avatarUrl: string }) => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatarUrl, onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!onUpload) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onUpload) return;

    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    const formDataAvatar = new FormData();
    formDataAvatar.append('avatar', file);

    const loadingToast = toast.loading('Updating avatar...');

    try {
      const { data } = await apiClient.patch<{ avatarUrl: string }>(
        '/users/me/avatar',
        formDataAvatar,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      onUpload({ avatarUrl: data.avatarUrl });
      toast.success('Avatar updated successfully', { id: loadingToast });
    } catch {
      toast.error('Failed to update avatar', { id: loadingToast });
    }
  };

  return (
    <AvatarWrapper>
      {avatarUrl ? (
        <Avatar src={avatarUrl} alt="Avatar" />
      ) : (
        <AvatarPlaceholder>
          <FiUser />
        </AvatarPlaceholder>
      )}
      {onUpload && (
        <AvatarUploadButton onClick={handleClick}>
          <FiCamera />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
        </AvatarUploadButton>
      )}
    </AvatarWrapper>
  );
};

export default UserAvatar;
