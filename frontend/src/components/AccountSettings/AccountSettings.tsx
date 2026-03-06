import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import apiClient from '@/api/axios';
import MainButton from '@/components/buttons/MainButton';
import UserAvatar from '@/components/UserAvatar';
import type { UserProfile } from '@/types/auth';
import {
  AccountSettingsContainer,
  LeftColumn,
  UserNameSection,
  UserName,
  VipBadge,
  FormSection,
  FormGrid,
  FormField,
  Label,
  Input,
} from './AccountSettings.styled';

interface AccountSettingsProps {
  profile: UserProfile | null;
  onUpdate: (updatedProfile: Partial<UserProfile>) => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ profile, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    birthDate: profile?.birthDate?.split('T')[0] || '',
    address: profile?.address || '',
  });

  const isVip = profile?.role === 'ADMIN' || profile?.role === 'WINERY_OWNER';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const loadingToast = toast.loading('Updating profile...');
    try {
      const { data } = await apiClient.patch('/users/me', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || null,
        birthDate: formData.birthDate || null,
        address: formData.address || null,
      });
      onUpdate(data);
      setIsEditing(false);
      toast.success('Profile updated successfully', { id: loadingToast });
    } catch {
      toast.error('Failed to update profile', { id: loadingToast });
    }
  };

  return (
    <AccountSettingsContainer>
      <LeftColumn>
        <UserAvatar avatarUrl={profile?.avatarUrl} onUpload={onUpdate} />
        <UserNameSection>
          <UserName>
            {profile?.firstName} {profile?.lastName}
          </UserName>
          <VipBadge $isVip={isVip}>
            <FiStar />
            {isVip ? 'VIP Member' : 'Standard Member'}
          </VipBadge>
        </UserNameSection>
      </LeftColumn>

      <FormSection>
        <FormGrid>
          <FormField>
            <Label>First Name:</Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormField>
          <FormField>
            <Label>Last Name:</Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormField>
          <FormField>
            <Label>E-mail:</Label>
            <Input name="email" value={formData.email} disabled />
          </FormField>
          <FormField>
            <Label>Phone:</Label>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="+000 XX XXX XXXX"
            />
          </FormField>
          <FormField>
            <Label>Date of Birth:</Label>
            <Input
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormField>
          <FormField>
            <Label>Address:</Label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="Your address"
            />
          </FormField>
        </FormGrid>

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          {isEditing ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <MainButton onClick={() => setIsEditing(false)}>Cancel</MainButton>
              <MainButton onClick={handleSubmit}>Save Changes</MainButton>
            </div>
          ) : (
            <MainButton onClick={() => setIsEditing(true)}>Edit Information</MainButton>
          )}
        </div>
      </FormSection>
    </AccountSettingsContainer>
  );
};

export default AccountSettings;
