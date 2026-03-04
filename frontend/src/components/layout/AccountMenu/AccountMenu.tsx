import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiClock,
  FiBell,
  FiInbox,
  FiHome,
  FiStar,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';
import { MenuContainer, MenuItem } from './AccountMenu.styled';

export type AccountSection =
  | 'Personal Info'
  | 'History'
  | 'Notification Center'
  | 'Wines'
  | 'Wineries'
  | 'Buy VIP'
  | 'Account Settings';

interface AccountMenuProps {
  activeSection: AccountSection;
  onSectionChange: (section: AccountSection) => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ activeSection, onSectionChange }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems: { name: AccountSection; icon: React.ReactNode }[] = [
    { name: 'Personal Info', icon: <FiUser /> },
    { name: 'History', icon: <FiClock /> },
    { name: 'Notification Center', icon: <FiBell /> },
    { name: 'Wines', icon: <FiInbox /> },
    { name: 'Wineries', icon: <FiHome /> },
    { name: 'Buy VIP', icon: <FiStar /> },
    { name: 'Account Settings', icon: <FiSettings /> },
  ];

  return (
    <MenuContainer>
      {menuItems.map((item) => (
        <MenuItem
          key={item.name}
          $active={activeSection === item.name}
          onClick={() => onSectionChange(item.name)}
        >
          {item.icon}
          {item.name}
        </MenuItem>
      ))}
      <MenuItem $isLogout onClick={handleLogout}>
        <FiLogOut />
        Sign Out
      </MenuItem>
    </MenuContainer>
  );
};

export default AccountMenu;
