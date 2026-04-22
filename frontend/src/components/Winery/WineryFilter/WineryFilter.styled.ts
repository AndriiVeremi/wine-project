import styled from 'styled-components';
import Dropdown from '../../Buttons/Dropdown/Dropdown';
import { breakpoints } from '@/styles/breakpoints';

export const StyledWineryFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  position: relative;
  z-index: 100;

  @media (min-width: ${breakpoints.tablet}) {
    gap: 16px;
  }
`;

export const StyledDropDown = styled(Dropdown)<{ $isOpen?: boolean }>`
  width: calc(50% - 6px);
  height: 50px;
  flex-shrink: 0;
  position: relative;
  z-index: ${(props) => (props.$isOpen ? 105 : 10)};

  @media (min-width: ${breakpoints.tablet}) {
    width: 180px;
  }
`;

export const SearchFieldWrapper = styled.div`
  width: 100%;
  z-index: 1;

  @media (min-width: ${breakpoints.tablet}) {
    flex-grow: 1;
    width: auto;
    min-width: 200px;
  }
`;
