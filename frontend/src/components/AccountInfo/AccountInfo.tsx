import React from 'react';
import { FiStar } from 'react-icons/fi';
import type { UserProfile } from '@/types/auth';
import UserAvatar from '@/components/UserAvatar';
import {
  AccountInfoContainer,
  ProfileHeader,
  UserNameSection,
  UserName,
  VipBadge,
  InfoList,
  InfoItem,
  InfoLabel,
  InfoValue,
} from './AccountInfo.styled';

interface AccountInfoProps {
  profile: UserProfile | null;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ profile }) => {
  const isVip = profile?.role === 'ADMIN' || profile?.role === 'WINERY_OWNER';

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRoleName = (role?: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrator';
      case 'WINERY_OWNER':
        return 'Winery Owner';
      case 'USER':
        return 'Standard User';
      default:
        return '-';
    }
  };

  return (
    <AccountInfoContainer>
      <ProfileHeader>
        <UserAvatar avatarUrl={profile?.avatarUrl} />
        <UserNameSection>
          <UserName>
            {profile?.firstName} {profile?.lastName}
          </UserName>
          <VipBadge $isVip={isVip}>
            <FiStar fill={isVip ? 'var(--rating-gold)' : 'none'} />
            {isVip ? 'VIP Member' : 'Standard Member'}
          </VipBadge>
        </UserNameSection>
      </ProfileHeader>

      <InfoList>
        <InfoItem>
          <InfoLabel>E-mail:</InfoLabel>
          <InfoValue>{profile?.email}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Phone Number:</InfoLabel>
          <InfoValue>{profile?.phone || '-'}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Date of Birth:</InfoLabel>
          <InfoValue>{formatDate(profile?.birthDate)}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Address:</InfoLabel>
          <InfoValue>{profile?.address || '-'}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Account Type:</InfoLabel>
          <InfoValue>{getRoleName(profile?.role)}</InfoValue>
        </InfoItem>
      </InfoList>
    </AccountInfoContainer>
  );
};

export default AccountInfo;
