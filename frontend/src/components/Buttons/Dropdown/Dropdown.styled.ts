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
  border: 1px solid ${({ $active }) => ($active ? 'var(--primary-wine)' : 'rgba(132, 16, 19, 0.1)')};
  background: var(--footer-cream);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $active }) => ($active ? '0 4px 12px rgba(132, 16, 19, 0.15)' : 'none')};

  &:hover {
    border-color: var(--primary-wine);
    background: var(--white);
  }

  &:active {
    transform: translateY(0);
  }

  .dropdown-label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    flex: 1;
    min-width: 0;
    text-align: left;
  }

  .label-name {
    font-size: 10px;
    text-transform: uppercase;
    color: var(--secondary-gray);
    font-weight: 700;
    letter-spacing: 0.8px;
    opacity: 0.8;
  }

  .current-value {
    font-size: 14px;
    font-weight: 600;
    color: ${({ $active }) => ($active ? 'var(--primary-wine)' : 'var(--primary-gray)')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;
  }
`;

export const ArrowIcon = styled(FiChevronDown)<{ $open: boolean }>`
  color: var(--primary-wine);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  margin-left: 10px;
  opacity: 0.8;
  width: 16px;
  height: 16px;
`;

export const List = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  min-width: 220px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(132, 16, 19, 0.1);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  overflow: hidden;
  padding: 8px;
  animation: ${fadeIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (min-width: ${breakpoints.tablet}) {
    width: auto;
    min-width: 100%;
  }
`;

export const ScrollWrapper = styled.div`
  overflow-y: auto;
  max-height: 280px;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--tertiary-gray);
    border-radius: 10px;
  }
`;

export const Item = styled.li<{ $selected?: boolean }>`
  padding: 10px 16px;
  margin-bottom: 2px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $selected }) => ($selected ? 'var(--white)' : 'var(--primary-gray)')};
  background: ${({ $selected }) => ($selected ? 'var(--primary-wine)' : 'transparent')};
  transition: all 0.2s ease;
  white-space: nowrap;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${({ $selected }) =>
      $selected ? 'var(--primary-wine)' : 'rgba(132, 16, 19, 0.05)'};
    color: ${({ $selected }) => ($selected ? 'var(--white)' : 'var(--primary-wine)')};
    transform: translateX(4px);
  }
`;
