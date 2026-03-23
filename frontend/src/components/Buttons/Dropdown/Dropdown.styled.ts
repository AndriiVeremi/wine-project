import styled from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';
import { breakpoints } from '@/styles/breakpoints';

export const Wrapper = styled.div<{ $disabled?: boolean }>`
  position: relative;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;

export const Button = styled.button<{ $active: boolean; $disabled?: boolean }>`
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

  .dropdown-label {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;
  }
`;

export const ArrowIcon = styled(FiChevronDown)<{ $open: boolean }>`
  color: var(--brown-icon);
  transition: var(--transition);
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});

  width: 16px;
  height: 16px;

  @media (min-width: ${breakpoints.tablet}) {
    width: 18px;
    height: 18px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: 20px;
    height: 20px;
  }
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
  padding: 0;
`;

export const ScrollWrapper = styled.div`
  overflow-y: auto;

  max-height: 200px;

  @media (min-width: ${breakpoints.tablet}) {
    max-height: 260px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    max-height: 320px;
  }
`;

export const Item = styled.li`
  padding: 16px 24px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: var(--filter-active-bg);
  }
`;
