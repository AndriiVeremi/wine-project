import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth/authStore';
import AccountSidebar from '@/components/User/UserSidebar/UserSidebar';
import type { AccountSection } from '@/components/User/UserSidebar/UserSidebar';
import WineManager from '@/components/Wine/WineManager/WineManager';
import TourManager from '@/components/Tour/TourManager/TourManager';
import GrapeManager from '@/components/Grape/GrapeList/GrapeManager';
import AdminWineries from '@/components/Winery/WineryList/AdminWineries';
import UsersList from '@/components/User/UserManager/UsersList';
import AdminReviews from '@/components/User/ReviewManager/AdminReviews';
import AddWinery from '@/components/Forms/AddWineryForm/AddWineryForm';
import AccountInfo from '@/components/User/UserInfo/UserInfo';
import AccountSettings from '@/components/User/UserSettings/UserSettings';
import AccountReviews from '@/components/User/UserReviews/UserReviews';
import Wishlist from '@/components/User/UserWishList/UserWishList';
import ContactsInfo from '@/components/User/ContactsInfo/ContactsInfo';
import Container from '@/components/Common/Container';
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
      case 'All Wineries':
        return <AdminWineries />;
      case 'All Wines':
        return <WineManager />;
      case 'All Grapes':
        return <GrapeManager />;
      case 'All Tours':
        return <TourManager />;
      case 'Users':
        return <UsersList />;
      case 'Reviews':
        return <AdminReviews />;
      case 'My Wishlist':
        return <Wishlist />;
      case 'My Reviews':
        return <AccountReviews />;
      case 'Account Settings':
        return (
          <AccountSettings
            info={profile}
            updateData={(updated) =>
              useAuthStore.setState({ profile: { ...profile!, ...updated } })
            }
          />
        );
      case 'Contacts':
        return (
          <>
            <SectionTitle>Our Team</SectionTitle>
            <ContactsInfo />
          </>
        );
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
