import { IoChevronDownSharp } from 'react-icons/io5';
import { FiGlobe } from 'react-icons/fi';
import styled from 'styled-components';
import { DropdownMenu, DropdownMenuItem } from '../ListStyles/ListStyles';

export const GlobeIcon = styled(FiGlobe)`
  color: var(--brown-icon);
  width: 20px;
  height: 28px;
  stroke-width: 1.4px;
`;

export const LanguageWrapper = styled.div`
  position: relative;
  cursor: pointer;
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
`;

export const LangText = styled.span`
  font-family: var(--font-main);
  color: var(--font-grey);
  font-size: 17px;
  font-weight: 500;
  line-height: 26px;
`;

export const DropDownIcon = styled(IoChevronDownSharp)<{ $isOpen: boolean }>`
  color: var(--font-grey);
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export { DropdownMenu as DropdownList };
export { DropdownMenuItem as DropdownItem };
