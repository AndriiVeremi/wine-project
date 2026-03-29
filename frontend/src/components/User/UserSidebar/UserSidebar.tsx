import { useAuthStore } from '@/store/auth/authStore';
import { useProfile } from '@/hooks/queries/useAuth';
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
  | 'Contacts';

interface Props {
  currentSection: AccountSection;
  setSection: (section: AccountSection) => void;
}

type MenuItemData =
  | { name: string; icon: React.ReactNode; type: 'section' }
  | { name: string; icon: React.ReactNode; type: 'link'; path: string };

const AccountSidebar = ({ currentSection, setSection }: Props) => {
  const { logout } = useAuthStore();
  const { data: profile } = useProfile();
  const navigate = useNavigate();

  const isOwner = profile?.role === 'WINERY_OWNER';
  const isAdmin = profile?.role === 'ADMIN';

  const getMenuItems = () => {
    const commonItems: MenuItemData[] = [{ name: 'Contacts', icon: <FiMail />, type: 'section' }];
    const linkItems: MenuItemData[] = [
      { name: 'About project', icon: <FiInfo />, type: 'link', path: '/about' },
    ];

    let items: MenuItemData[] = [];

    if (isAdmin) {
      items = [
        { name: 'Personal Info', icon: <FiUser />, type: 'section' },
        { name: 'All Wineries', icon: <FiHome />, type: 'section' },
        { name: 'All Wines', icon: <FaWineBottle />, type: 'section' },
        { name: 'All Grapes', icon: <FaLeaf />, type: 'section' },
        { name: 'All Tours', icon: <FiMap />, type: 'section' },
        { name: 'Users', icon: <FiUsers />, type: 'section' },
        { name: 'Reviews', icon: <FiMessageSquare />, type: 'section' },
        { name: 'Account Settings', icon: <FiSettings />, type: 'section' },
      ];
    } else if (isOwner) {
      items = [
        { name: 'Personal Info', icon: <FiUser />, type: 'section' },
        { name: 'My Winery', icon: <FiHome />, type: 'section' },
        { name: 'My Wines', icon: <FaWineBottle />, type: 'section' },
        { name: 'My Tours', icon: <FiMap />, type: 'section' },
        { name: 'Grapes', icon: <FaLeaf />, type: 'section' },
        { name: 'Account Settings', icon: <FiSettings />, type: 'section' },
      ];
    } else {
      items = [
        { name: 'Personal Info', icon: <FiUser />, type: 'section' },
        { name: 'My Wishlist', icon: <FiHeart />, type: 'section' },
        { name: 'My Reviews', icon: <FiStar />, type: 'section' },
        { name: 'Account Settings', icon: <FiSettings />, type: 'section' },
      ];
    }

    return [...items, ...commonItems, ...linkItems];
  };

  const items = getMenuItems();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleItemClick = (item: MenuItemData) => {
    if (item.type === 'link') {
      navigate(item.path);
    } else {
      setSection(item.name as AccountSection);
    }
  };

  return (
    <MenuContainer>
      {items.map((item) => (
        <MenuItem
          key={item.name}
          $active={currentSection === item.name}
          onClick={() => handleItemClick(item)}
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
