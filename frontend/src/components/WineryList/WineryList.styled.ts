import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

export const StyledWineryList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 120px;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: var(--secondary-gray);
  margin-top: 50px;
`;
