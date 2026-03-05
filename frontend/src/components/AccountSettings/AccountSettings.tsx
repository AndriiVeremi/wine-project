import React, { useState } from 'react';
import toast from 'react-hot-toast';
import apiClient from '@/api/axios';
import MainButton from '@/components/buttons/MainButton';
import type { UserProfile } from '@/types/auth';
import {
  AccountSettingsContainer,
  FormGrid,
  FormField,
  Label,
  Input,
  ButtonWrapper,
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
  });

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
      </FormGrid>

      <ButtonWrapper>
        {isEditing ? (
          <div style={{ display: 'flex', gap: '10px' }}>
            <MainButton onClick={() => setIsEditing(false)}>
              Cancel
            </MainButton>
            <MainButton onClick={handleSubmit}>Save Changes</MainButton>
          </div>
        ) : (
          <MainButton onClick={() => setIsEditing(true)}>Edit Information</MainButton>
        )}
      </ButtonWrapper>
    </AccountSettingsContainer>
  );
};

export default AccountSettings;
