import styled from 'styled-components';
import Dropdown from '../../Buttons/Dropdown/Dropdown';
import { breakpoints } from '@/styles/breakpoints';

export const StyledWineFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  width: 100%;
  position: relative;
  z-index: 100;

  @media (min-width: ${breakpoints.tablet}) {
    gap: 16px;
    margin-bottom: 24px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    gap: 20px;
    margin-bottom: 32px;
  }
`;

export const StyledDropDown = styled(Dropdown)<{ $isOpen?: boolean }>`
  flex-basis: calc((100% - 12px) / 2);
  height: 48px;
  text-transform: capitalize;
  flex-shrink: 0;
  position: relative;
  z-index: ${(props) => (props.$isOpen ? 105 : 10)};

  @media (min-width: ${breakpoints.tablet}) {
    flex-basis: calc((100% - 32px) / 3);
    width: 160px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    flex-basis: calc((100% - 100px) / 6);
    width: 180px;
  }
`;
