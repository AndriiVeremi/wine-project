import styled from 'styled-components';
import { FiUser } from 'react-icons/fi';

export const UserIcon = styled(FiUser)`
  color: var(--brown-icon);
  width: 20px;
  height: 28px;
  stroke-width: 1.8px;
  transition: var(--transition);
`;

export const LoginText = styled.span`
  font-family: var(--font-main);
  color: var(--font-grey);
  font-size: 17px;
  font-weight: 500;
  line-height: 26px;
  transition: var(--transition);
`;

export const LoginWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    ${UserIcon}, ${LoginText} {
      color: var(--primary-wine);
    }
  }
`;

export const List = styled('ul')`
  display: flex;
  align-items: center;
  gap: 8px;
`;
