import { useState } from 'react';
import { StyledDropDown, StyledWineFilterContainer } from './WineFilter.styled';
import { useFiltersStore } from '@/store/wine/filtersStore';
import FilterClearButton from '../buttons/FilterClearButton';

interface PropsWineFilter {
  className?: string;
}

const WineFilter = ({ className }: PropsWineFilter) => {
  const filters = useFiltersStore((s) => s);
  const setFilter = useFiltersStore((s) => s.setFilter);
  const clearFilters = useFiltersStore((s) => s.clearFilters);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <StyledWineFilterContainer className={className}>
      <StyledDropDown
        label="Region"
        value={filters.region}
        options={['Georgia', 'France', 'Italy']}
        isOpen={openDropdown === 'region'}
        onOpen={() => setOpenDropdown(openDropdown === 'region' ? null : 'region')}
        onSelect={(value) => setFilter('region', value)}
      />

      <StyledDropDown
        label="Sweetness"
        value={filters.sweetness}
        options={['Dry', 'Semi-dry', 'Semi-sweet', 'Sweet']}
        isOpen={openDropdown === 'sweetness'}
        onOpen={() => setOpenDropdown(openDropdown === 'sweetness' ? null : 'sweetness')}
        onSelect={(value) => setFilter('sweetness', value)}
      />

      <StyledDropDown
        label="Color"
        value={filters.color}
        options={['Red', 'White', 'Rose', 'Orange']}
        isOpen={openDropdown === 'color'}
        onOpen={() => setOpenDropdown(openDropdown === 'color' ? null : 'color')}
        onSelect={(value) => setFilter('color', value)}
      />

      <StyledDropDown
        label="Grape"
        value={filters.grape}
        options={['Saperavi', 'Rkatsiteli', 'Cabernet']}
        isOpen={openDropdown === 'grape'}
        onOpen={() => setOpenDropdown(openDropdown === 'grape' ? null : 'grape')}
        onSelect={(value) => setFilter('grape', value)}
      />

      <StyledDropDown
        label="Winery"
        value={filters.wineryId}
        options={['Shumi', 'Khareba', 'Teliani']}
        isOpen={openDropdown === 'wineryId'}
        onOpen={() => setOpenDropdown(openDropdown === 'wineryId' ? null : 'wineryId')}
        onSelect={(value) => setFilter('wineryId', value)}
      />

      <StyledDropDown
        label="Rating"
        value={filters.minRating}
        options={['5', '4', '3']}
        isOpen={openDropdown === 'minRating'}
        onOpen={() => setOpenDropdown(openDropdown === 'minRating' ? null : 'minRating')}
        onSelect={(value) => setFilter('minRating', value)}
      />

      <StyledDropDown
        label="Vintage"
        value={filters.vintage}
        options={['2023', '2022', '2021', '2020']}
        isOpen={openDropdown === 'vintage'}
        onOpen={() => setOpenDropdown(openDropdown === 'vintage' ? null : 'vintage')}
        onSelect={(value) => setFilter('vintage', value)}
      />

      <FilterClearButton onClick={clearFilters}>Clear filters</FilterClearButton>
    </StyledWineFilterContainer>
  );
};

export default WineFilter;
