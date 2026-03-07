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
  data: UserProfile | null;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ data }) => {
  const isVip = data?.role === 'ADMIN' || data?.role === 'WINERY_OWNER';

  // Simple date format
  const birthday = data?.birthDate ? new Date(data.birthDate).toLocaleDateString() : '-';

  // Simple role mapping
  const roleName =
    data?.role === 'ADMIN'
      ? 'Administrator'
      : data?.role === 'WINERY_OWNER'
        ? 'Winery Owner'
        : 'User';

  return (
    <AccountInfoContainer>
      <ProfileHeader>
        <UserAvatar url={data?.avatarUrl} />
        <UserNameSection>
          <UserName>
            {data?.firstName} {data?.lastName}
          </UserName>
          <VipBadge $isVip={isVip}>
            <FiStar fill={isVip ? 'var(--rating-gold)' : 'none'} />
            {isVip ? 'VIP Member' : 'Regular Member'}
          </VipBadge>
        </UserNameSection>
      </ProfileHeader>

      <InfoList>
        <InfoItem>
          <InfoLabel>Email:</InfoLabel>
          <InfoValue>{data?.email}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Phone:</InfoLabel>
          <InfoValue>{data?.phone || 'Not provided'}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Birthday:</InfoLabel>
          <InfoValue>{birthday}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Address:</InfoLabel>
          <InfoValue>{data?.address || 'Not provided'}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Role:</InfoLabel>
          <InfoValue>{roleName}</InfoValue>
        </InfoItem>
      </InfoList>
    </AccountInfoContainer>
  );
};

export default AccountInfo;
