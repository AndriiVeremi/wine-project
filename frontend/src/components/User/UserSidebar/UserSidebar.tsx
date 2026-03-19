import { useAuthStore } from '@/store/auth/authStore';
import { useNavigate } from 'react-router-dom';
import {
  FiUser,
  FiHeart,
  FiStar,
  FiSettings,
  FiLogOut,
  FiHome,
  FiMap,
  FiUsers,
  FiMessageSquare,
  FiInfo,
  FiMail,
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
  | 'Notification Center'
  | 'All Wines'
  | 'All Grapes'
  | 'All Wineries'
  | 'All Tours'
  | 'Users'
  | 'Reviews'
  | 'About project'
  | 'Contacts';

interface Props {
  currentSection: AccountSection;
  setSection: (section: AccountSection) => void;
}

const AccountSidebar = ({ currentSection, setSection }: Props) => {
  const { profile, logout } = useAuthStore();
  const navigate = useNavigate();

  const isOwner = profile?.role === 'WINERY_OWNER';
  const isAdmin = profile?.role === 'ADMIN';

  const getMenuItems = () => {
    const baseItems = [
      { name: 'About project', icon: <FiInfo /> },
      { name: 'Contacts', icon: <FiMail /> },
    ];

    if (isAdmin) {
      return [
        { name: 'Personal Info', icon: <FiUser /> },
        { name: 'All Wineries', icon: <FiHome /> },
        { name: 'All Wines', icon: <FaWineBottle /> },
        { name: 'All Grapes', icon: <FaLeaf /> },
        { name: 'All Tours', icon: <FiMap /> },
        { name: 'Users', icon: <FiUsers /> },
        { name: 'Reviews', icon: <FiMessageSquare /> },
        { name: 'Account Settings', icon: <FiSettings /> },
        ...baseItems,
      ];
    }

    if (isOwner) {
      return [
        { name: 'Personal Info', icon: <FiUser /> },
        { name: 'My Winery', icon: <FiHome /> },
        { name: 'My Wines', icon: <FaWineBottle /> },
        { name: 'My Tours', icon: <FiMap /> },
        { name: 'Grapes', icon: <FaLeaf /> },
        { name: 'Account Settings', icon: <FiSettings /> },
        ...baseItems,
      ];
    }

    return [
      { name: 'Personal Info', icon: <FiUser /> },
      { name: 'My Wishlist', icon: <FiHeart /> },
      { name: 'My Reviews', icon: <FiStar /> },
      { name: 'Account Settings', icon: <FiSettings /> },
      ...baseItems,
    ];
  };

  const items = getMenuItems();

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
