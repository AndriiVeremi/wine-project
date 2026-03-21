import styled from 'styled-components';
import { CiLocationOn } from 'react-icons/ci';
import { IoChevronDownSharp } from 'react-icons/io5';
import '@/styles/vars.css';

export const Text = styled('p')<{ $isOpen?: boolean }>`
  font-family: var(--font-main);
  color: ${({ $isOpen }) => ($isOpen ? 'var(--primary-wine)' : 'var(--font-grey)')};
  font-size: 17px;
  font-weight: 500;
  font-style: medium;
  line-height: 26px;
  transition: var(--transition);
`;

export const LocationIcon = styled(CiLocationOn)<{ $isOpen?: boolean }>`
  color: ${({ $isOpen }) => ($isOpen ? 'var(--primary-wine)' : 'var(--brown-icon)')};
  width: 22px;
  height: 30px;
  margin-right: 2px;
  stroke-width: 0.6px;
  transition: var(--transition);
`;

export const DropDownIcon = styled(IoChevronDownSharp)<{ $isOpen: boolean }>`
  color: ${({ $isOpen }) => ($isOpen ? 'var(--primary-wine)' : 'var(--font-grey)')};
  width: 20px;
  height: 20px;
  transition: var(--transition);
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const RelativeContainer = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    ${Text}, ${LocationIcon}, ${DropDownIcon} {
      color: var(--primary-wine);
    }
  }
`;
