import SearchBar from '@/components/Common/SearchBar';
import WineFilter from '@/components/Wine/WineFilter';
import { breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const StyledWineFilter = styled(WineFilter)``;
export const StyledSearchBar = styled(SearchBar)``;

export const SearchAndClearWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    gap: 16px;
    margin-bottom: 60px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    flex-direction: row;
    align-items: center;
    gap: 20px;
    margin-bottom: 80px;
  }
`;
