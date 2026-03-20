import styled from 'styled-components';
import { FiUser } from 'react-icons/fi';
import { RiUserLine } from 'react-icons/ri';

export const LoginWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const UserIcon = styled(FiUser)`
  color: var(--brown-icon);
  width: 20px;
  height: 28px;
  stroke-width: 1.8px;
`;

export const LoginText = styled.span`
  font-family: var(--font-main);
  color: var(--font-grey);
  font-size: 17px;
  font-weight: 500;
  line-height: 26px;
`;

export const List = styled('ul')`
  display: flex;
  align-items: center;
  gap: 8px;
`;