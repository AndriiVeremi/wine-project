import styled from 'styled-components';
import Dropdown from '../buttons/Dropdown/Dropdown';

export const StyledWineFilterContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const StyledDropDown = styled(Dropdown)`
  width: calc((100% - 96px) / 7);
  height: 56px;
`;
