import React, { useRef } from 'react';
import { FiUser, FiCamera } from 'react-icons/fi';
import toast from 'react-hot-toast';
import apiClient from '@/api/axios';
import { AvatarWrapper, Avatar, AvatarPlaceholder, AvatarUploadButton } from './UserAvatar.styled';

interface UserAvatarProps {
  url?: string;
  onSave?: (res: { avatarUrl: string }) => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ url, onSave }) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const openInput = () => {
    if (onSave) fileInput.current?.click();
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSave) return;

    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5000000) {
      toast.error('Image is too big (max 5MB)');
      return;
    }

    const body = new FormData();
    body.append('avatar', file);

    try {
      const { data } = await apiClient.patch<{ avatarUrl: string }>('/users/me/avatar', body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onSave({ avatarUrl: data.avatarUrl });
      toast.success('Done!');
    } catch {
      toast.error('Upload failed');
    }
  };

  return (
    <AvatarWrapper>
      {url ? (
        <Avatar src={url} alt="User" />
      ) : (
        <AvatarPlaceholder>
          <FiUser />
        </AvatarPlaceholder>
      )}
      {onSave && (
        <AvatarUploadButton onClick={openInput}>
          <FiCamera />
          <input type="file" ref={fileInput} onChange={uploadFile} accept="image/*" />
        </AvatarUploadButton>
      )}
    </AvatarWrapper>
  );
};

export default UserAvatar;
