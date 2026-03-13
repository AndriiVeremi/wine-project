import { useState } from 'react';
import { StyledDropDown, StyledWineFilterContainer } from './WineFilter.styled';
import { useFiltersStore } from '@/store/wine/filtersStore';
import { useLocationStore } from '@/store/location/locationStore';
import FilterClearButton from '../buttons/FilterClearButton';
import type { WineColor, WineSweetness } from '@/types/wine';

interface PropsWineFilter {
  className?: string;
}

const WineFilter = ({ className }: PropsWineFilter) => {
  const { region, sweetness, color, grape, minRating, vintage, setFilter, clearFilters } =
    useFiltersStore();
  const { regions, loading: regionsLoading } = useLocationStore();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <StyledWineFilterContainer className={className}>
      <StyledDropDown
        label="Region"
        value={regions.find((r) => r._id === region)?.name || ''}
        options={regions.map((r) => r.name)}
        isOpen={openDropdown === 'region'}
        onOpen={() => setOpenDropdown(openDropdown === 'region' ? null : 'region')}
        onSelect={(value) => {
          const selectedRegion = regions.find((r) => r.name === value);
          setFilter('region', selectedRegion?._id || '');
        }}
        disabled={regionsLoading || regions.length === 0}
      />

      <StyledDropDown
        label="Sweetness"
        value={sweetness}
        options={['Dry', 'Semi-dry', 'Semi-sweet', 'Sweet']}
        isOpen={openDropdown === 'sweetness'}
        onOpen={() => setOpenDropdown(openDropdown === 'sweetness' ? null : 'sweetness')}
        onSelect={(value) => setFilter('sweetness', value as WineSweetness)}
      />

      <StyledDropDown
        label="Color"
        value={color}
        options={['Red', 'White', 'Rose', 'Orange']}
        isOpen={openDropdown === 'color'}
        onOpen={() => setOpenDropdown(openDropdown === 'color' ? null : 'color')}
        onSelect={(value) => setFilter('color', value as WineColor)}
      />

      {/* Поки що залишимо ці списки як є, але в ідеалі їх теж треба завантажувати */}
      <StyledDropDown
        label="Grape"
        value={grape}
        options={['Saperavi', 'Rkatsiteli', 'Kisi']}
        isOpen={openDropdown === 'grape'}
        onOpen={() => setOpenDropdown(openDropdown === 'grape' ? null : 'grape')}
        onSelect={(value) => setFilter('grape', value)}
      />

      <StyledDropDown
        label="Rating"
        value={minRating}
        options={['5', '4', '3']}
        isOpen={openDropdown === 'minRating'}
        onOpen={() => setOpenDropdown(openDropdown === 'minRating' ? null : 'minRating')}
        onSelect={(value) => setFilter('minRating', value)}
      />

      <StyledDropDown
        label="Vintage"
        value={vintage}
        options={['2023', '2022', '2021', '2020', '2019', '2018']}
        isOpen={openDropdown === 'vintage'}
        onOpen={() => setOpenDropdown(openDropdown === 'vintage' ? null : 'vintage')}
        onSelect={(value) => setFilter('vintage', value)}
      />

      <FilterClearButton onClick={clearFilters}>Clear filters</FilterClearButton>
    </StyledWineFilterContainer>
  );
};

export default WineFilter;
