import styled from 'styled-components';

export const StyledWineList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

export const StyledWineListItem = styled.li`
  flex-basis: calc(25% - 32px);
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
