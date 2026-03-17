import Location from '@/components/Common/Location';
import Language from '@/components/Common/Language';
import Login from '@/components/LoginPanel';
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
