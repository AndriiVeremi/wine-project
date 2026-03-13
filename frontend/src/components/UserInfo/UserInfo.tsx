import { FiStar, FiMail, FiPhone, FiCalendar, FiMapPin, FiUser } from 'react-icons/fi';
import type { UserProfile } from '@/types/auth';
import UserAvatar from '@/components/UserAvatar';
import {
  AccountInfoContainer,
  ProfileHeader,
  UserNameSection,
  UserName,
  VipBadge,
  InfoGrid,
  InfoCard,
  IconBox,
  CardContent,
  Label,
  Value,
} from './UserInfo.styled';

interface Props {
  data: UserProfile | null;
}

const AccountInfo = ({ data }: Props) => {
  const isVip = data?.role === 'ADMIN' || data?.role === 'WINERY_OWNER';
  const bday = data?.birthDate ? new Date(data.birthDate).toLocaleDateString() : '-';
  const role =
    data?.role === 'ADMIN' ? 'Admin' : data?.role === 'WINERY_OWNER' ? 'Winery Owner' : 'Member';

  const items = [
    { label: 'Email', value: data?.email, icon: <FiMail /> },
    { label: 'Phone', value: data?.phone || 'Not set', icon: <FiPhone /> },
    { label: 'Birthday', value: bday, icon: <FiCalendar /> },
    { label: 'Address', value: data?.address || 'Not set', icon: <FiMapPin /> },
    { label: 'Role', value: role, icon: <FiUser /> },
  ];

  return (
    <AccountInfoContainer>
      <ProfileHeader>
        <UserAvatar url={data?.avatarUrl} />
        <UserNameSection>
          <UserName>
            {data?.firstName} {data?.lastName}
          </UserName>
          <VipBadge $isVip={isVip}>
            <FiStar fill={isVip ? '#ffb400' : 'none'} />
            {isVip ? 'VIP Member' : 'Regular Member'}
          </VipBadge>
        </UserNameSection>
      </ProfileHeader>

      <InfoGrid>
        {items.map((item, idx) => (
          <InfoCard key={idx}>
            <IconBox>{item.icon}</IconBox>
            <CardContent>
              <Label>{item.label}</Label>
              <Value>{item.value}</Value>
            </CardContent>
          </InfoCard>
        ))}
      </InfoGrid>
    </AccountInfoContainer>
  );
};

export default AccountInfo;
