import { useState, useRef } from 'react';
import { useGrapeFiltersStore } from '@/store/grape/grapeFiltersStore';
import { useLocationStore } from '@/store/location/locationStore';
import FilterClearButton from '../buttons/FilterClearButton';
import { StyledDropDown, StyledWineFilterContainer } from '../WineFilter/WineFilter.styled';
import { useQuery } from '@tanstack/react-query';
import { getRegions } from '@/api/regions';

const ACITIDY_OPTIONS = ['Low', 'Medium', 'High', 'Very High'];
const BODY_OPTIONS = ['Light', 'Medium', 'Full-bodied'];
const GRAPE_TYPES = ['Red', 'White', 'Rose'];

interface RegionOption {
  _id: string;
  name: string;
}

const GrapeFilter = () => {
  const filters = useGrapeFiltersStore();
  const { country } = useLocationStore();

  const { data: regions = [], isLoading: isLoadingRegions } = useQuery<RegionOption[]>({
    queryKey: ['regions', country],
    queryFn: async () => {
      const res = await getRegions(country);
      return res.data;
    },
    enabled: !!country,
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const handleOpen = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleClear = () => {
    filters.clearFilters();
    if (window.innerWidth < 768 && filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <StyledWineFilterContainer ref={filterRef}>
      <StyledDropDown
        label="Type"
        value={filters.type}
        options={GRAPE_TYPES}
        isOpen={openDropdown === 'type'}
        $isOpen={openDropdown === 'type'}
        onOpen={() => handleOpen('type')}
        onSelect={(val) => {
          filters.setFilter('type', val);
          setOpenDropdown(null);
        }}
      />

      <StyledDropDown
        label="Region"
        value={regions.find((r) => r._id === filters.region)?.name || ''}
        options={regions.map((r) => r.name)}
        isOpen={openDropdown === 'region'}
        $isOpen={openDropdown === 'region'}
        onOpen={() => handleOpen('region')}
        onSelect={(val) => {
          const selectedRegion = regions.find((r) => r.name === val);
          filters.setFilter('region', selectedRegion?._id || '');
          setOpenDropdown(null);
        }}
        disabled={isLoadingRegions || regions.length === 0}
      />

      <StyledDropDown
        label="Body"
        value={filters.body}
        options={BODY_OPTIONS}
        isOpen={openDropdown === 'body'}
        $isOpen={openDropdown === 'body'}
        onOpen={() => handleOpen('body')}
        onSelect={(val) => {
          filters.setFilter('body', val);
          setOpenDropdown(null);
        }}
      />

      <StyledDropDown
        label="Acidity"
        value={filters.acidity}
        options={ACITIDY_OPTIONS}
        isOpen={openDropdown === 'acidity'}
        $isOpen={openDropdown === 'acidity'}
        onOpen={() => handleOpen('acidity')}
        onSelect={(val) => {
          filters.setFilter('acidity', val);
          setOpenDropdown(null);
        }}
      />

      <FilterClearButton onClick={handleClear}>Clear filters</FilterClearButton>
    </StyledWineFilterContainer>
  );
};

export default GrapeFilter;
