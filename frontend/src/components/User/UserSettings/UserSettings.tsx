import React, { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import MainButton from '@/components/Buttons/MainButton';
import UserAvatar from '@/components/User/UserAvatar';
import FormField from '@/components/Common/FormField/FormField';
import { useQueryClient } from '@tanstack/react-query';
import { useProfileMutations } from '@/hooks/queries/useAuth';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useAuthStore } from '@/store/auth/authStore';
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
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ info }) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { updateProfile } = useProfileMutations();
  const [editing, setEditing] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: info?.firstName || '',
    lastName: info?.lastName || '',
    email: info?.email || '',
    phone: info?.phone || '',
    birthDate: info?.birthDate?.split('T')[0] || '',
    address: info?.address || '',
  });

  useEffect(() => {
    if (info) {
      setInputs((prev) => ({
        ...prev,
        firstName: info.firstName || '',
        lastName: info.lastName || '',
        email: info.email || '',
        phone: info.phone || '',
        birthDate: info.birthDate?.split('T')[0] || '',
        address: info.address || '',
      }));
    }
  }, [info]);

  const isVip = info?.role === 'ADMIN' || info?.role === 'WINERY_OWNER';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setInputs({ ...inputs, [id]: value });
  };

  const handleSave = async () => {
    try {
      const phoneRegexp = /^\+\d{10,14}$/;
      if (inputs.phone && !phoneRegexp.test(inputs.phone)) {
        toast.error('Phone number must start with + and contain 10-14 digits');
        return;
      }

      if (inputs.birthDate) {
        const birthDateObj = new Date(inputs.birthDate);
        const minDate = new Date('1900-01-01');
        const maxDate = new Date();

        if (birthDateObj < minDate) {
          toast.error('Birth date cannot be earlier than 1900');
          return;
        }

        if (birthDateObj > maxDate) {
          toast.error('Birth date cannot be in the future');
          return;
        }
      }

      const updatePayload = {
        firstName: inputs.firstName.trim(),
        lastName: inputs.lastName.trim(),
        phone: inputs.phone,
        birthDate: inputs.birthDate || undefined,
        address: inputs.address,
      };

      await updateProfile(updatePayload);
      setEditing(false);
    } catch (err: unknown) {
      toast.error('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  const onAvatarUpdate = () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.profile(user?.uid) });
  };

  return (
    <AccountSettingsContainer>
      <LeftColumn>
        <UserAvatar url={info?.avatarUrl} onSave={onAvatarUpdate} />
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
