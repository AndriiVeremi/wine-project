import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import apiClient from '@/api/axios';
import MainButton from '@/components/buttons/MainButton';
import UserAvatar from '@/components/UserAvatar';
import FormField from '@/components/common/FormField/FormField';
import type { UserProfile } from '@/types/auth';
import {
  AccountSettingsContainer,
  LeftColumn,
  UserNameSection,
  UserName,
  VipBadge,
  FormSection,
  FormGrid,
} from './UserSettings.styled';

interface AccountSettingsProps {
  info: UserProfile | null;
  updateData: (updated: Partial<UserProfile>) => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ info, updateData }) => {
  const [editing, setEditing] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: info?.firstName || '',
    lastName: info?.lastName || '',
    email: info?.email || '',
    phone: info?.phone || '',
    birthDate: info?.birthDate?.split('T')[0] || '',
    address: info?.address || '',
  });

  const isVip = info?.role === 'ADMIN' || info?.role === 'WINERY_OWNER';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    // For AccountSettings, we use 'name' instead of 'id' in state mapping
    setInputs({ ...inputs, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await apiClient.patch('/users/me', {
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        phone: inputs.phone,
        birthDate: inputs.birthDate,
        address: inputs.address,
      });

      updateData(response.data);
      setEditing(false);
      toast.success('Successfully updated!');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <AccountSettingsContainer>
      <LeftColumn>
        <UserAvatar url={info?.avatarUrl} onSave={updateData} />
        <UserNameSection>
          <UserName>
            {info?.firstName} {info?.lastName}
          </UserName>
          <VipBadge $isVip={isVip}>
            <FiStar />
            {isVip ? 'VIP Member' : 'Regular Member'}
          </VipBadge>
        </UserNameSection>
      </LeftColumn>

      <FormSection>
        <FormGrid>
          <FormField
            label="First Name"
            id="firstName"
            value={inputs.firstName}
            onChange={handleChange}
            disabled={!editing}
          />
          <FormField
            label="Last Name"
            id="lastName"
            value={inputs.lastName}
            onChange={handleChange}
            disabled={!editing}
          />
          <FormField
            label="Email"
            id="email"
            value={inputs.email}
            onChange={handleChange}
            disabled
          />
          <FormField
            label="Phone"
            id="phone"
            value={inputs.phone}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Your phone"
          />
          <FormField
            label="Birthday"
            id="birthDate"
            type="date"
            value={inputs.birthDate}
            onChange={handleChange}
            disabled={!editing}
          />
          <FormField
            label="Address"
            id="address"
            value={inputs.address}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Your address"
          />
        </FormGrid>

        <div style={{ display: 'flex', gap: '10px' }}>
          {editing ? (
            <>
              <MainButton onClick={() => setEditing(false)}>Cancel</MainButton>
              <MainButton onClick={handleSave}>Save</MainButton>
            </>
          ) : (
            <MainButton onClick={() => setEditing(true)}>Edit Info</MainButton>
          )}
        </div>
      </FormSection>
    </AccountSettingsContainer>
  );
};

export default AccountSettings;
