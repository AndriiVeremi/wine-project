import React from 'react';
import { FiStar } from 'react-icons/fi';
import type { UserProfile } from '@/types/auth';
import UserAvatar from '@/components/UserAvatar';
import {
  PersonalInfoContainer,
  LeftColumn,
  UserNameSection,
  UserName,
  VipBadge,
  InfoSection,
  InfoRow,
  InfoLabel,
  InfoValue,
} from './PersonalInformation.styled';

interface PersonalInformationProps {
  profile: UserProfile | null;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ profile }) => {
  const isVip = profile?.role === 'ADMIN' || profile?.role === 'WINERY_OWNER';

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <PersonalInfoContainer>
      <LeftColumn>
        <UserAvatar avatarUrl={profile?.avatarUrl} />
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

      <InfoSection>
        <InfoRow>
          <InfoLabel>First Name:</InfoLabel>
          <InfoValue>{profile?.firstName}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Last Name:</InfoLabel>
          <InfoValue>{profile?.lastName}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>E-mail:</InfoLabel>
          <InfoValue>{profile?.email}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Phone:</InfoLabel>
          <InfoValue>{profile?.phone || '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Date of Birth:</InfoLabel>
          <InfoValue>{formatDate(profile?.birthDate)}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Address:</InfoLabel>
          <InfoValue>{profile?.address || '-'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Account Type:</InfoLabel>
          <InfoValue>{profile?.role?.replace('_', ' ')}</InfoValue>
        </InfoRow>
      </InfoSection>
    </PersonalInfoContainer>
  );
};

export default PersonalInformation;
