import styled from 'styled-components';
import Dropdown from '../buttons/Dropdown/Dropdown';
import { breakpoints } from '@/styles/breakpoints';

export const StyledWineFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 30px;
  width: 100%;
  position: relative;
  z-index: 100;

  @media (min-width: ${breakpoints.tablet}) {
    gap: 16px;
    margin-bottom: 40px;
  }
`;

export const StyledDropDown = styled(Dropdown)<{ $isOpen?: boolean }>`
  width: calc(50% - 6px); /* 2 колонки на мобілці */
  height: 48px;
  text-transform: capitalize;
  flex-shrink: 0;
  position: relative;
  z-index: ${(props) => (props.$isOpen ? 105 : 10)};

  @media (min-width: ${breakpoints.tablet}) {
    width: 160px; /* Фіксована ширина на планшеті */
  }

  @media (min-width: ${breakpoints.desktop}) {
    width: 180px; /* Трохи ширше на десктопі */
  }
`;
