import Location from '@/components/Location';
import Language from '@/components/Language';
import Login from '@/components/Login';
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
