import styled from 'styled-components';

export const StyledTourList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  width: 100%;
`;

export const StyledTourListItem = styled.li`
  width: 100%;

  @media (min-width: 768px) {
    width: calc((100% - 32px) / 2);
  }

  @media (min-width: 1280px) {
    width: calc((100% - 2 * 32px) / 3);
  }

  @media (min-width: 1440px) {
    width: calc((100% - 3 * 32px) / 4);
  }
`;
