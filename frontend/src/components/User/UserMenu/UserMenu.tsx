import Location from '@/features/location/Location';
import Language from '@/components/Common/Language';
import Login from '@/features/auth/LoginPanel';
import { ListMenu, UserMenuContainer } from './UserMenu.styled';

const UserMenu = () => {
  return (
    <UserMenuContainer>
      <ListMenu>
        <li>
          <Location />
        </li>
        <li>
          <Language />
        </li>
        <li>
          <Login />
        </li>
      </ListMenu>
    </UserMenuContainer>
  );
};

export default UserMenu;
