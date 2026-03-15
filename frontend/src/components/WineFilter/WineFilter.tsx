import { useState, useRef } from 'react';
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
  const filterRef = useRef<HTMLDivElement>(null);

  const handleOpen = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleClear = () => {
    clearFilters();
    if (window.innerWidth < 768 && filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <StyledWineFilterContainer className={className} ref={filterRef}>
      <StyledDropDown
        label="Region"
        value={regions.find((r) => r._id === region)?.name || ''}
        options={regions.map((r) => r.name)}
        isOpen={openDropdown === 'region'}
        $isOpen={openDropdown === 'region'}
        onOpen={() => handleOpen('region')}
        onSelect={(value) => {
          const selectedRegion = regions.find((r) => r.name === value);
          setFilter('region', selectedRegion?._id || '');
          setOpenDropdown(null);
        }}
        disabled={regionsLoading || regions.length === 0}
      />

      <StyledDropDown
        label="Sweetness"
        value={sweetness}
        options={['Dry', 'Semi-dry', 'Semi-sweet', 'Sweet']}
        isOpen={openDropdown === 'sweetness'}
        $isOpen={openDropdown === 'sweetness'}
        onOpen={() => handleOpen('sweetness')}
        onSelect={(value) => {
          setFilter('sweetness', value as WineSweetness);
          setOpenDropdown(null);
        }}
      />

      <StyledDropDown
        label="Color"
        value={color}
        options={['Red', 'White', 'Rose', 'Orange']}
        isOpen={openDropdown === 'color'}
        $isOpen={openDropdown === 'color'}
        onOpen={() => handleOpen('color')}
        onSelect={(value) => {
          setFilter('color', value as WineColor);
          setOpenDropdown(null);
        }}
      />

      <StyledDropDown
        label="Grape"
        value={grape}
        options={['Saperavi', 'Rkatsiteli', 'Kisi']}
        isOpen={openDropdown === 'grape'}
        $isOpen={openDropdown === 'grape'}
        onOpen={() => handleOpen('grape')}
        onSelect={(value) => {
          setFilter('grape', value);
          setOpenDropdown(null);
        }}
      />

      <StyledDropDown
        label="Rating"
        value={minRating}
        options={['5', '4', '3']}
        isOpen={openDropdown === 'minRating'}
        $isOpen={openDropdown === 'minRating'}
        onOpen={() => handleOpen('minRating')}
        onSelect={(value) => {
          setFilter('minRating', value);
          setOpenDropdown(null);
        }}
      />

      <StyledDropDown
        label="Vintage"
        value={vintage}
        options={['2023', '2022', '2021', '2020', '2019', '2018']}
        isOpen={openDropdown === 'vintage'}
        $isOpen={openDropdown === 'vintage'}
        onOpen={() => handleOpen('vintage')}
        onSelect={(value) => {
          setFilter('vintage', value);
          setOpenDropdown(null);
        }}
      />

      <FilterClearButton onClick={handleClear}>Clear filters</FilterClearButton>
    </StyledWineFilterContainer>
  );
};

export default WineFilter;
