import styled from 'styled-components';

export const StyledGrapeList = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledGrapeListItem = styled.li`
  width: 100%;
  display: flex;
`;
