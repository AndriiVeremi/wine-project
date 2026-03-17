import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const StyledWineList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 70px;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }
`;

export const StyledWineListItem = styled.li`
  width: 100%;
  display: flex;
`;
