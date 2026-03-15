import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const StyledGrapeList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
`;

export const StyledGrapeListItem = styled.li`
  width: 100%;
  display: flex;
`;
