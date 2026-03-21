import { IoChevronDownSharp } from 'react-icons/io5';
import { FiGlobe } from 'react-icons/fi';
import styled from 'styled-components';
import { DropdownMenu, DropdownMenuItem } from '../ListStyles/ListStyles';

export const GlobeIcon = styled(FiGlobe)<{ $isOpen?: boolean }>`
  color: ${({ $isOpen }) => ($isOpen ? 'var(--primary-wine)' : 'var(--brown-icon)')};
  width: 20px;
  height: 28px;
  stroke-width: 1.4px;
  transition: var(--transition);
`;

export const LangText = styled.span<{ $isOpen?: boolean }>`
  font-family: var(--font-main);
  color: ${({ $isOpen }) => ($isOpen ? 'var(--primary-wine)' : 'var(--font-grey)')};
  font-size: 17px;
  font-weight: 500;
  line-height: 26px;
  transition: var(--transition);
`;

export const DropDownIcon = styled(IoChevronDownSharp)<{ $isOpen: boolean }>`
  color: ${({ $isOpen }) => ($isOpen ? 'var(--primary-wine)' : 'var(--font-grey)')};
  width: 20px;
  height: 20px;
  transition: var(--transition);
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const LanguageTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    ${GlobeIcon}, ${LangText}, ${DropDownIcon} {
      color: var(--primary-wine);
    }
  }
`;

export const LanguageWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export { DropdownMenu as DropdownList };
export { DropdownMenuItem as DropdownItem };
