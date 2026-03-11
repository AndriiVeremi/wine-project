import { useState } from 'react';
import { useGrapeFiltersStore } from '@/store/grape/grapeFiltersStore';
import { useLocationStore } from '@/store/location/locationStore';
import FilterClearButton from '../buttons/FilterClearButton';
import { StyledDropDown, StyledWineFilterContainer } from '../WineFilter/WineFilter.styled';

const ACITIDY_OPTIONS = ['Low', 'Medium', 'High', 'Very High'];
const BODY_OPTIONS = ['Light', 'Medium', 'Full-bodied'];
const GRAPE_TYPES = ['Red', 'White', 'Rose'];

const GrapeFilter = () => {
  const filters = useGrapeFiltersStore();
  const { regions, loading: regionsLoading } = useLocationStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <StyledWineFilterContainer>
      <StyledDropDown
        label="Type"
        value={filters.type}
        options={GRAPE_TYPES}
        isOpen={openDropdown === 'type'}
        onOpen={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
        onSelect={(val) => filters.setFilter('type', val)}
      />

      <StyledDropDown
        label="Region"
        value={regions.find((r) => r._id === filters.region)?.name || ''}
        options={regions.map((r) => r.name)}
        isOpen={openDropdown === 'region'}
        onOpen={() => setOpenDropdown(openDropdown === 'region' ? null : 'region')}
        onSelect={(val) => {
          const selectedRegion = regions.find((r) => r.name === val);
          filters.setFilter('region', selectedRegion?._id || '');
        }}
        disabled={regionsLoading || regions.length === 0}
      />

      <StyledDropDown
        label="Body"
        value={filters.body}
        options={BODY_OPTIONS}
        isOpen={openDropdown === 'body'}
        onOpen={() => setOpenDropdown(openDropdown === 'body' ? null : 'body')}
        onSelect={(val) => filters.setFilter('body', val)}
      />

      <StyledDropDown
        label="Acidity"
        value={filters.acidity}
        options={ACITIDY_OPTIONS}
        isOpen={openDropdown === 'acidity'}
        onOpen={() => setOpenDropdown(openDropdown === 'acidity' ? null : 'acidity')}
        onSelect={(val) => filters.setFilter('acidity', val)}
      />

      <FilterClearButton onClick={filters.clearFilters}>Clear filters</FilterClearButton>
    </StyledWineFilterContainer>
  );
};

export default GrapeFilter;
