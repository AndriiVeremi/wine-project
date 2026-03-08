import styled from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';

export const Wrapper = styled.div`
  position: relative;
  width: 180px;
  height: 56px;
`;

export const Button = styled.button<{ $active: boolean }>`
  width: 100%;
  height: 100%;
  padding: 16px 24px;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--filter-border-color);
  background: ${({ $active }) => ($active ? 'var(--filter-active-bg)' : 'var(--white)')};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  transition: var(--transition);

  &:hover {
    background: var(--filter-active-bg);
  }
`;

export const ArrowIcon = styled(FiChevronDown)<{ $open: boolean }>`
  color: var(--brown-icon);
  transition: var(--transition);
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
`;

export const List = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: var(--white);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--filter-border-color);
  box-shadow: var(--main-shadow);
  z-index: 10;
  overflow: hidden;
`;

export const Item = styled.li`
  padding: 16px 24px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: var(--filter-active-bg);
  }
`;
