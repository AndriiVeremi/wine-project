import { useState, useMemo, forwardRef } from 'react';
import { useGrapeFiltersStore } from '@/store/grape/grapeFiltersStore';
import { useLocationStore } from '@/store/location/locationStore';
import { StyledDropDown, StyledWineFilterContainer } from '../../Wine/WineFilter/WineFilter.styled';
import { useQuery } from '@tanstack/react-query';
import { getRegions } from '@/api/regions';
import { QUERY_KEYS } from '@/constants/queryKeys';

const ACITIDY_OPTIONS = ['Low', 'Medium', 'High', 'Very High'];
const BODY_OPTIONS = ['Light', 'Medium', 'Full-bodied'];
const GRAPE_TYPES = ['Red', 'White', 'Rose'];

interface PropsGrapeFilter {
  className?: string;
}

interface RegionOption {
  _id: string;
  name: string;
}

const GrapeFilter = forwardRef<HTMLDivElement, PropsGrapeFilter>(({ className }, ref) => {
  const filters = useGrapeFiltersStore();
  const { country } = useLocationStore();

  const { data: regionsRaw, isLoading: isLoadingRegions } = useQuery<RegionOption[]>({
    queryKey: QUERY_KEYS.regions.byCountry(country),
    queryFn: async () => {
      if (!country) return [];
      const res = await getRegions(country);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!country,
  });

  const regions = useMemo(() => (Array.isArray(regionsRaw) ? regionsRaw : []), [regionsRaw]);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleOpen = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const selectedRegionName = useMemo(() => {
    return regions.find((r) => r._id === filters.region)?.name || '';
  }, [regions, filters.region]);

  const regionOptions = useMemo(() => regions.map((r) => r.name), [regions]);

  return (
    <StyledWineFilterContainer className={className} ref={ref}>
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
        value={selectedRegionName}
        options={regionOptions}
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
    </StyledWineFilterContainer>
  );
});

export default GrapeFilter;
