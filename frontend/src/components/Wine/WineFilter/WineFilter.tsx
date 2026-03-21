import { useState, useRef } from 'react';
import { StyledDropDown, StyledWineFilterContainer } from './WineFilter.styled';
import { useFiltersStore } from '@/store/wine/filtersStore';
import { useLocationStore } from '@/store/location/locationStore';
import FilterClearButton from '../../Buttons/FilterClearButton';
import type { WineColor, WineSweetness } from '@/types/wine';
import { useQuery } from '@tanstack/react-query';
import { getRegions } from '@/api/regions';
import { COLOR_OPTIONS, SWEETNESS_OPTIONS } from '@/constants/wine';
import { getGrapes } from '@/api/grapes';
import type { Grape } from '@/types/grape';

interface PropsWineFilter {
  className?: string;
}

interface RegionOption {
  _id: string;
  name: string;
}

const WineFilter = ({ className }: PropsWineFilter) => {
  const { region, sweetness, color, grape, minRating, vintage, setFilter, clearFilters } =
    useFiltersStore();

  const { country } = useLocationStore();

  const { data: regionsRaw = [], isLoading: isLoadingRegions } = useQuery({
    queryKey: ['regions', country],
    queryFn: async () => {
      if (!country) return [];
      const res = await getRegions(country);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!country,
  });

  const regions = Array.isArray(regionsRaw) ? (regionsRaw as RegionOption[]) : [];

  const { data: grapesRaw = [], isLoading: isLoadingGrapes } = useQuery({
    queryKey: ['grapes', region],
    queryFn: async () => {
      const res = await getGrapes({ limit: 9999, region });
      return res.data && Array.isArray(res.data.grapes) ? res.data.grapes : [];
    },
  });

  const grapes = Array.isArray(grapesRaw) ? (grapesRaw as Grape[]) : [];

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

  const selectedRegionName =
    (Array.isArray(regions) ? regions : []).find((r) => r._id === region)?.name || '';

  return (
    <StyledWineFilterContainer className={className} ref={filterRef}>
      <StyledDropDown
        label="Region"
        value={selectedRegionName}
        options={(Array.isArray(regions) ? regions : []).map((r) => r.name)}
        isOpen={openDropdown === 'region'}
        $isOpen={openDropdown === 'region'}
        onOpen={() => handleOpen('region')}
        onSelect={(value) => {
          const selectedRegion = (Array.isArray(regions) ? regions : []).find(
            (r) => r.name === value,
          );
          setFilter('region', selectedRegion?._id || '');
          setOpenDropdown(null);
        }}
        disabled={isLoadingRegions || regions.length === 0}
      />

      <StyledDropDown
        label="Sweetness"
        value={sweetness}
        options={SWEETNESS_OPTIONS}
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
        options={COLOR_OPTIONS}
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
        options={(Array.isArray(grapes) ? grapes : []).map((g) => g.name)}
        isOpen={openDropdown === 'grape'}
        $isOpen={openDropdown === 'grape'}
        onOpen={() => handleOpen('grape')}
        onSelect={(value) => {
          setFilter('grape', value);
          setOpenDropdown(null);
        }}
        disabled={isLoadingGrapes}
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
