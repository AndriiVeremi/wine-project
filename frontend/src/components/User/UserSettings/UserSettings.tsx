import React, { useState, useEffect } from 'react';
import { FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { updatePassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
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
    newPassword: '',
    confirmPassword: '',
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
      const updatePayload = {
        firstName: inputs.firstName.trim(),
        lastName: inputs.lastName.trim(),
        phone: inputs.phone,
        birthDate: inputs.birthDate || undefined,
        address: inputs.address,
      };

      await updateProfile(updatePayload);

      if (inputs.newPassword !== '') {
        if (inputs.newPassword !== inputs.confirmPassword) {
          toast.error('Passwords do not match!');
          return;
        }

        if (inputs.newPassword.length < 6) {
          toast.error('Password must be at least 6 characters');
          return;
        }

        const user = auth.currentUser;
        if (user) {
          await updatePassword(user, inputs.newPassword);
          toast.success('Password updated in Firebase!');
          setInputs((prev) => ({ ...prev, newPassword: '', confirmPassword: '' }));
        }
      }

      setEditing(false);
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'code' in err &&
        (err as { code: string }).code === 'auth/requires-recent-login'
      ) {
        toast.error('Please logout and login again to change password (security rule)');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
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
          <FormField
            label="New Password"
            id="newPassword"
            type="password"
            value={inputs.newPassword}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Enter new password"
          />
          <FormField
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            value={inputs.confirmPassword}
            onChange={handleChange}
            disabled={!editing}
            placeholder="Confirm new password"
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
