import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth/authStore';
import AccountSidebar from '@/components/UserSidebar/UserSidebar';
import type { AccountSection } from '@/components/UserSidebar/UserSidebar';
import WineManager from '@/components/WineManager/WineManager';
import TourManager from '@/components/TourManager/TourManager';
import GrapeManager from '@/components/GrapeList/GrapeManager';
import AddWinery from '@/components/forms/AddWineryForm/AddWineryForm';
import AccountInfo from '@/components/UserInfo/UserInfo';
import AccountSettings from '@/components/UserSettings/UserSettings';
import AccountReviews from '@/components/UserReviews/UserReviews';
import Wishlist from '@/components/UserWishList/UserWishList';
import Container from '@/components/common/Container';
import type { UserProfile } from '@/types/auth';
import type { Winery } from '@/types/wineries';
import {
  AccountPageContainer,
  ContentArea,
  PlaceholderText,
  SectionTitle,
} from './AccountPage.styled';

const AccountPage = () => {
  const { user, profile, fetchProfile, isLoading } = useAuthStore();
  const [activeSection, setActiveSection] = useState<AccountSection>('Personal Info');

  useEffect(() => {
    if (user?.uid && !profile) {
      fetchProfile();
    }
  }, [user?.uid, profile, fetchProfile]);

  if (!user) return <Navigate to="/" replace />;
  if (isLoading) return <PlaceholderText>Loading...</PlaceholderText>;

  const renderContent = () => {
    const wineryId = profile?.winery?._id;

    switch (activeSection) {
      case 'Personal Info':
        return <AccountInfo data={profile as UserProfile} />;
      case 'My Winery':
        return (
          <>
            <SectionTitle>My Winery</SectionTitle>
            <AddWinery
              wineryData={profile?.winery as unknown as Winery}
              onSuccess={() => fetchProfile()}
            />
          </>
        );
      case 'My Wines':
        return <WineManager wineryId={wineryId} />;
      case 'My Tours':
        return <TourManager wineryId={wineryId} />;
      case 'Grapes':
        return <GrapeManager wineryId={wineryId} />;
      case 'My Wishlist':
        return <Wishlist />;
      case 'My Reviews':
        return <AccountReviews />;
      case 'Account Settings':
        return <AccountSettings />;
      default:
        return <PlaceholderText>Coming soon...</PlaceholderText>;
    }
  };

  return (
    <Container>
      <AccountPageContainer>
        <AccountSidebar currentSection={activeSection} setSection={setActiveSection} />
        <ContentArea>{renderContent()}</ContentArea>
      </AccountPageContainer>
    </Container>
  );
};

export default AccountPage;
