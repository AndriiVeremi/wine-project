import { useState, useRef } from 'react';
import { useTourFiltersStore } from '@/store/tours/tourFiltersStore';
import { useLocationStore } from '@/store/location/locationStore';
import FilterClearButton from '@/components/buttons/FilterClearButton';
import {
  StyledDropDown,
  StyledWineFilterContainer,
} from '@/components/WineFilter/WineFilter.styled';
import { useQuery } from '@tanstack/react-query';
import { getRegions } from '@/api/regions';

interface RegionOption {
  _id: string;
  name: string;
}

const TourFilter = () => {
  const { region, setFilter, clearFilters } = useTourFiltersStore();
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
    clearFilters();
    if (window.innerWidth < 768 && filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <StyledWineFilterContainer ref={filterRef}>
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
        disabled={isLoadingRegions || regions.length === 0}
      />

      <FilterClearButton onClick={handleClear}>Clear filters</FilterClearButton>
    </StyledWineFilterContainer>
  );
};

export default TourFilter;
