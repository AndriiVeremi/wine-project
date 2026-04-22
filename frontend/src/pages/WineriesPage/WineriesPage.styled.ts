import SearchBar from '@/components/Common/SearchBar';
import WineryFilter from '@/components/Winery/WineryFilter/WineryFilter';
import { breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const StyledWineryFilter = styled(WineryFilter)`
  margin-bottom: 24px;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 30px;
  }
`;

export const StyledSearchBar = styled(SearchBar)`
  margin-bottom: 40px;

  @media (min-width: ${breakpoints.tablet}) {
    margin-bottom: 60px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    margin-bottom: 80px;
  }
`;
