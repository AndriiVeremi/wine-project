import { useState, useMemo, forwardRef } from 'react';
import { StyledDropDown, StyledWineryFilterContainer } from './WineryFilter.styled';
import { useWineriesFiltersStore } from '@/store/wineries/wineriesFiltersStore';
import { useLocationStore } from '@/store/location/locationStore';
import { useQuery } from '@tanstack/react-query';
import { getRegions } from '@/api/regions';
import { QUERY_KEYS } from '@/constants/queryKeys';

interface PropsWineryFilter {
  className?: string;
}

interface RegionOption {
  _id: string;
  name: string;
}

const WineryFilter = forwardRef<HTMLDivElement, PropsWineryFilter>(({ className }, ref) => {
  const { region, setFilter } = useWineriesFiltersStore();

  const { country } = useLocationStore();

  const { data: regionsRaw = [], isLoading: isLoadingRegions } = useQuery({
    queryKey: QUERY_KEYS.regions.byCountry(country),
    queryFn: async () => {
      if (!country) return [];
      const res = await getRegions(country);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!country,
  });

  const regions = useMemo(
    () => (Array.isArray(regionsRaw) ? (regionsRaw as RegionOption[]) : []),
    [regionsRaw],
  );

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleOpen = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const selectedRegionName = useMemo(() => {
    return regions.find((r) => r._id === region)?.name || '';
  }, [regions, region]);

  const regionOptions = useMemo(() => regions.map((r) => r.name), [regions]);

  return (
    <StyledWineryFilterContainer className={className} ref={ref}>
      <StyledDropDown
        label="Region"
        value={selectedRegionName}
        options={regionOptions}
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
    </StyledWineryFilterContainer>
  );
});

export default WineryFilter;
