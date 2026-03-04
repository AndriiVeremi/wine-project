import React, { useState } from 'react';
import AccountMenu from '@/components/layout/AccountMenu/AccountMenu';
import type { AccountSection } from '@/components/layout/AccountMenu/AccountMenu';
import AddWines from '@/components/AddWines/AddWines';
import { StyledContainer } from '@/components/common/Container/Container.styled';
import {
  AccountPageContainer,
  ContentArea,
  SectionTitle,
  PlaceholderText,
} from './AccountPage.styled';

const AccountPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AccountSection>('Personal Info');

  const renderContent = () => {
    switch (activeSection) {
      case 'Wines':
        return <AddWines />;
      case 'Personal Info':
        return (
          <>
            <SectionTitle>Personal Info</SectionTitle>
            <PlaceholderText>
              Here you will be able to manage your profile information.
            </PlaceholderText>
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
      case 'Notification Center':
        return (
          <>
            <SectionTitle>Notification Center</SectionTitle>
            <PlaceholderText>Manage your notifications and alerts.</PlaceholderText>
          </>
        );
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
      case 'Account Settings':
        return (
          <>
            <SectionTitle>Account Settings</SectionTitle>
            <PlaceholderText>General account preferences and security settings.</PlaceholderText>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <StyledContainer>
      <AccountPageContainer>
        <AccountMenu activeSection={activeSection} onSectionChange={setActiveSection} />
        <ContentArea>{renderContent()}</ContentArea>
      </AccountPageContainer>
    </StyledContainer>
  );
};

export default AccountPage;
