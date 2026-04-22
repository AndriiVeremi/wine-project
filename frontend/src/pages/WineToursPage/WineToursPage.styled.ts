import SearchBar from '@/components/Common/SearchBar';
import TourFilter from '@/components/Tour/TourList/TourFilter/TourFilter';
import { breakpoints } from '@/styles/breakpoints';
import styled from 'styled-components';

export const StyledTourFilter = styled(TourFilter)`
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
