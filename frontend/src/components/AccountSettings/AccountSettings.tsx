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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
          <FormField>
            <Label>First Name:</Label>
            <Input
              name="firstName"
              value={inputs.firstName}
              onChange={handleChange}
              disabled={!editing}
            />
          </FormField>
          <FormField>
            <Label>Last Name:</Label>
            <Input
              name="lastName"
              value={inputs.lastName}
              onChange={handleChange}
              disabled={!editing}
            />
          </FormField>
          <FormField>
            <Label>Email:</Label>
            <Input name="email" value={inputs.email} disabled />
          </FormField>
          <FormField>
            <Label>Phone:</Label>
            <Input
              name="phone"
              value={inputs.phone}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Your phone"
            />
          </FormField>
          <FormField>
            <Label>Birthday:</Label>
            <Input
              name="birthDate"
              type="date"
              value={inputs.birthDate}
              onChange={handleChange}
              disabled={!editing}
            />
          </FormField>
          <FormField>
            <Label>Address:</Label>
            <Input
              name="address"
              value={inputs.address}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Your address"
            />
          </FormField>
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
