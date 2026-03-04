import { Item, List, Text } from '@/components/Location/Location.styled';
import { UserIcon } from './Login.styled';

const Login = () => {
  return (
    <>
      <List>
        <Item>
          <UserIcon />
        </Item>
        <Item>
          <Text>Login</Text>
        </Item>
      </List>
    </>
  );
};

export default Login;
