import React from 'react';
import { useAuthStore } from '@/store/auth/authStore';
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
import { FaWineBottle, FaLeaf } from 'react-icons/fa';
import { MenuContainer, MenuItem } from './UserSidebar.styled';

export type AccountSection =
  | 'Personal Info'
  | 'History'
  | 'My Wishlist'
  | 'My Reviews'
  | 'Account Settings'
  | 'Add Wine'
  | 'Add Winery'
  | 'Add Grape'
  | 'Buy VIP';

interface AccountSidebarProps {
  currentSection: AccountSection;
  setSection: (s: AccountSection) => void;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ currentSection, setSection }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const isOwnerOrAdmin = user?.role === 'WINERY_OWNER' || user?.role === 'ADMIN';

  const items = isOwnerOrAdmin
    ? [
        { name: 'Personal Info', icon: <FiUser /> },
        { name: 'Add Winery', icon: <FiHome /> },
        { name: 'Add Wine', icon: <FaWineBottle /> },
        { name: 'Add Grape', icon: <FaLeaf /> },
        { name: 'Notification Center', icon: <FiInbox /> },
        { name: 'Buy VIP', icon: <FiStar /> },
        { name: 'History', icon: <FiClock /> },
        { name: 'Account Settings', icon: <FiSettings /> },
      ]
    : [
        { name: 'Personal Info', icon: <FiUser /> },
        { name: 'My Wishlist', icon: <FiHeart /> },
        { name: 'My Reviews', icon: <FiStar /> },
        { name: 'History', icon: <FiClock /> },
        { name: 'Account Settings', icon: <FiSettings /> },
      ];

  return (
    <MenuContainer>
      {items.map((item) => (
        <MenuItem
          key={item.name as string}
          $active={currentSection === item.name}
          onClick={() => setSection(item.name as AccountSection)}
        >
          {item.icon}
          {item.name as string}
        </MenuItem>
      ))}
      <MenuItem $isLogout onClick={handleSignOut}>
        <FiLogOut />
        Logout
      </MenuItem>
    </MenuContainer>
  );
};

export default AccountSidebar;
