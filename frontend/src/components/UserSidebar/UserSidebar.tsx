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
  FiMap,
} from 'react-icons/fi';
import { FaWineBottle, FaLeaf } from 'react-icons/fa';
import { MenuContainer, MenuItem } from './UserSidebar.styled';

export type AccountSection =
  | 'Personal Info'
  | 'History'
  | 'My Wishlist'
  | 'My Reviews'
  | 'Account Settings'
  | 'My Wines'
  | 'My Tours'
  | 'My Winery'
  | 'Grapes'
  | 'Buy VIP'
  | 'Notification Center';

interface Props {
  currentSection: AccountSection;
  setSection: (section: AccountSection) => void;
}

const AccountSidebar = ({ currentSection, setSection }: Props) => {
  const { profile, logout } = useAuthStore();
  const navigate = useNavigate();

  const isOwner = profile?.role === 'WINERY_OWNER';
  const isAdmin = profile?.role === 'ADMIN';

  const items =
    isOwner || isAdmin
      ? [
          { name: 'Personal Info', icon: <FiUser /> },
          { name: 'My Winery', icon: <FiHome /> },
          { name: 'My Wines', icon: <FaWineBottle /> },
          { name: 'My Tours', icon: <FiMap /> },
          { name: 'Grapes', icon: <FaLeaf /> },
          { name: 'Notification Center', icon: <FiInbox /> },
          { name: 'Buy VIP', icon: <FiStar /> },
          { name: 'History', icon: <FiClock /> },
          { name: 'Account Settings', icon: <FiSettings /> },
        ]
      : [
          { name: 'Personal Info', icon: <FiUser /> },
          { name: 'My Wishlist', icon: <FiHeart /> },
          { name: 'My Reviews', icon: <FiStar /> },
          { name: 'Buy VIP', icon: <FiStar /> },
          { name: 'History', icon: <FiClock /> },
          { name: 'Account Settings', icon: <FiSettings /> },
        ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <MenuContainer>
      {items.map((item) => (
        <MenuItem
          key={item.name}
          $active={currentSection === item.name}
          onClick={() => setSection(item.name as AccountSection)}
        >
          {item.icon}
          {item.name}
        </MenuItem>
      ))}
      <MenuItem $isLogout onClick={handleLogout}>
        <FiLogOut />
        Logout
      </MenuItem>
    </MenuContainer>
  );
};

export default AccountSidebar;
