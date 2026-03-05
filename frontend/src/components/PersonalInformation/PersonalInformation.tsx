import React, { useRef } from 'react';
import { FiStar, FiUser, FiCamera } from 'react-icons/fi';
import toast from 'react-hot-toast';
import apiClient from '@/api/axios';
import type { UserProfile } from '@/types/auth';
import {
  PersonalInfoContainer,
  AvatarSection,
  AvatarWrapper,
  Avatar,
  AvatarPlaceholder,
  AvatarUploadButton,
  UserNameSection,
  UserName,
  VipBadge,
  FormSection,
  FormGrid,
  FormField,
  Label,
  Value,
} from './PersonalInformation.styled';

interface PersonalInformationProps {
  profile: UserProfile | null;
  onUpdate: (updatedProfile: Partial<UserProfile>) => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ profile, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (e.g., 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    const loadingToast = toast.loading('Updating avatar...');

    try {
      const { data } = await apiClient.patch<{ avatarUrl: string }>('/users/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpdate({ avatarUrl: data.avatarUrl });
      toast.success('Avatar updated successfully', { id: loadingToast });
    } catch (error) {
      toast.error('Failed to update avatar', { id: loadingToast });
    }
  };

  const isVip = profile?.role === 'ADMIN' || profile?.role === 'WINERY_OWNER';

  return (
    <PersonalInfoContainer>
      <AvatarSection>
        <AvatarWrapper>
          {profile?.avatarUrl ? (
            <Avatar src={profile.avatarUrl} alt="Avatar" />
          ) : (
            <AvatarPlaceholder>
              <FiUser />
            </AvatarPlaceholder>
          )}
          <AvatarUploadButton onClick={handleAvatarClick}>
            <FiCamera />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </AvatarUploadButton>
        </AvatarWrapper>
      </AvatarSection>

      <FormSection>
        <UserNameSection>
          <UserName>
            {profile?.firstName} {profile?.lastName}
          </UserName>
          <VipBadge $isVip={isVip}>
            <FiStar />
            {isVip ? 'VIP Member' : 'Standard Member'}
          </VipBadge>
        </UserNameSection>

        <FormGrid>
          <FormField>
            <Label>First Name:</Label>
            <Value>{profile?.firstName}</Value>
          </FormField>
          <FormField>
            <Label>Last Name:</Label>
            <Value>{profile?.lastName}</Value>
          </FormField>
          <FormField>
            <Label>E-mail:</Label>
            <Value>{profile?.email}</Value>
          </FormField>
          <FormField>
            <Label>Account Type:</Label>
            <Value>{profile?.role?.replace('_', ' ')}</Value>
          </FormField>
        </FormGrid>
      </FormSection>
    </PersonalInfoContainer>
  );
};

export default PersonalInformation;
