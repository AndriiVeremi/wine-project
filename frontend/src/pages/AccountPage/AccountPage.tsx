import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth/authStore';
import AccountSidebar from '@/components/UserSidebar/UserSidebar';
import type { AccountSection } from '@/components/UserSidebar/UserSidebar';
import AddWines from '@/components/AddWines/AddWines';
import AccountInfo from '@/components/UserInfo/UserInfo';
import AccountSettings from '@/components/UserSettings/UserSettings';
import AccountReviews from '@/components/UserReviews/UserReviews';
import Wishlist from '@/components/UserWishList/UserWishList';
import Container from '@/components/common/Container';
import type { UserProfile } from '@/types/auth';
import apiClient from '@/api/axios';
import toast from 'react-hot-toast';
import {
  AccountPageContainer,
  ContentArea,
  SectionTitle,
  PlaceholderText,
} from './AccountPage.styled';

const AccountPage: React.FC = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const isOwner = user?.role === 'WINERY_OWNER';
  const defaultSection = isOwner ? 'Wines' : 'Personal Info';
  const [activeSection, setActiveSection] = useState<AccountSection>(defaultSection);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data } = await apiClient.get<UserProfile>('/users/me');
      setProfile(data);
    } catch {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (updatedProfile: Partial<UserProfile>) => {
    setProfile((prev) => (prev ? { ...prev, ...updatedProfile } : null));
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <PlaceholderText>Loading profile...</PlaceholderText>;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'Wines':
        return <AddWines />;
      case 'Wineries':
        return (
          <>
            <SectionTitle>Wineries</SectionTitle>
            <PlaceholderText>Manage your followed wineries and regions.</PlaceholderText>
          </>
        );
      case 'Buy VIP':
        return (
          <>
            <SectionTitle>Buy VIP Status</SectionTitle>
            <PlaceholderText>Upgrade your account to VIP for exclusive benefits.</PlaceholderText>
          </>
        );
      case 'Personal Info':
        return (
          <>
            <SectionTitle>Personal Info</SectionTitle>
            <AccountInfo data={profile} />
          </>
        );
      case 'History':
        return (
          <>
            <SectionTitle>History</SectionTitle>
            <PlaceholderText>
              Your purchase and activity history will be displayed here.
            </PlaceholderText>
          </>
        );
      case 'My Wishlist':
        return (
          <>
            <SectionTitle>My Wishlist</SectionTitle>
            <Wishlist />
          </>
        );
      case 'My Reviews':
        return (
          <>
            <SectionTitle>My Reviews</SectionTitle>
            <AccountReviews />
          </>
        );
      case 'Account Settings':
        return (
          <>
            <SectionTitle>Account Settings</SectionTitle>
            <AccountSettings info={profile} updateData={handleProfileUpdate} />
          </>
        );
      default:
        return null;
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
