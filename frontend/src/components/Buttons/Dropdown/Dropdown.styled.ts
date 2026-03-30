import styled, { keyframes } from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';
import { breakpoints } from '@/styles/breakpoints';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Wrapper = styled.div<{ $disabled?: boolean }>`
  position: relative;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
`;

export const Button = styled.button<{ $active: boolean; $disabled?: boolean }>`
  width: 100%;
  height: 100%;
  padding: 12px 20px;
  border-radius: var(--border-radius-lg);
  border: 1px solid
    ${({ $active }) => ($active ? 'var(--primary-wine)' : 'var(--filter-border-color)')};
  background: var(--footer-cream);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  transition: var(--transition);
  box-shadow: ${({ $active }) => ($active ? '0 4px 12px rgba(132, 16, 19, 0.15)' : 'none')};

  &:hover {
    border-color: var(--primary-wine);
    background: var(--white);
  }

  .dropdown-label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    flex: 1;
    min-width: 0;
    text-align: left;
  }

  .label-name {
    font-size: 11px;
    text-transform: uppercase;
    color: var(--secondary-gray);
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .current-value {
    font-size: 15px;
    font-weight: 500;
    color: var(--primary-wine);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;
  }
`;

export const ArrowIcon = styled(FiChevronDown)<{ $open: boolean }>`
  color: var(--primary-wine);
  transition: var(--transition);
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  margin-left: 8px;

  width: 18px;
  height: 18px;
`;

export const List = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  min-width: 200px;
  background: var(--white);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--tertiary-gray);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  padding: 8px 0;
  animation: ${fadeIn} 0.3s ease-out;

  @media (min-width: ${breakpoints.tablet}) {
    width: auto;
    min-width: 100%;
  }
`;

export const ScrollWrapper = styled.div`
  overflow-y: auto;
  max-height: 260px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: var(--footer-cream);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--primary-wine);
    border-radius: 10px;
  }
`;

export const Item = styled.li<{ $selected?: boolean }>`
  padding: 12px 24px;
  cursor: pointer;
  font-size: 15px;
  color: ${({ $selected }) => ($selected ? 'var(--white)' : 'var(--primary-gray)')};
  background: ${({ $selected }) => ($selected ? 'var(--primary-wine)' : 'transparent')};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ $selected }) => ($selected ? 'var(--primary-wine)' : 'var(--footer-cream)')};
    color: ${({ $selected }) => ($selected ? 'var(--white)' : 'var(--primary-wine)')};
  }
`;
