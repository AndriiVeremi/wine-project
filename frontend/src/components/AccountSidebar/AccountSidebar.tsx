import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiClock,
  FiHeart,
  FiStar,
  FiSettings,
  FiLogOut,
  FiInbox,
  FiHome,
} from 'react-icons/fi';
import { MenuContainer, MenuItem } from './AccountSidebar.styled';

export type AccountSection =
  | 'Personal Info'
  | 'History'
  | 'My Wishlist'
  | 'My Reviews'
  | 'Account Settings'
  | 'Wines'
  | 'Wineries'
  | 'Buy VIP';

interface AccountSidebarProps {
  activeSection: AccountSection;
  onSectionChange: (section: AccountSection) => void;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ activeSection, onSectionChange }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isOwner = user?.role === 'WINERY_OWNER';

  const menuItems: { name: AccountSection; icon: React.ReactNode }[] = isOwner
    ? [
        { name: 'Wines', icon: <FiInbox /> },
        { name: 'Wineries', icon: <FiHome /> },
        { name: 'Buy VIP', icon: <FiStar /> },
        { name: 'Account Settings', icon: <FiSettings /> },
      ]
    : [
        { name: 'Personal Info', icon: <FiUser /> },
        { name: 'History', icon: <FiClock /> },
        { name: 'My Wishlist', icon: <FiHeart /> },
        { name: 'My Reviews', icon: <FiStar /> },
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

export default AccountSidebar;
