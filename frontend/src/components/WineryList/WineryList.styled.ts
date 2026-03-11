import styled from 'styled-components';

export const StyledWineryList = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: var(--gray-color, #666666);
  margin-top: 50px;
`;
