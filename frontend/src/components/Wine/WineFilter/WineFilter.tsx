import { useState, useMemo, forwardRef } from 'react';
import { StyledDropDown, StyledWineFilterContainer } from './WineFilter.styled';
import { useFiltersStore } from '@/store/wine/filtersStore';
import { useLocationStore } from '@/store/location/locationStore';
import type { WineColor, WineSweetness } from '@/types/wine';
import { useQuery } from '@tanstack/react-query';
import { getRegions } from '@/api/regions';
import { COLOR_OPTIONS, SWEETNESS_OPTIONS } from '@/constants/wine';
import { useGrapes } from '@/hooks/queries/useGrapes';
import { QUERY_KEYS } from '@/constants/queryKeys';

interface PropsWineFilter {
  className?: string;
}

interface RegionOption {
  _id: string;
  name: string;
}

const WineFilter = forwardRef<HTMLDivElement, PropsWineFilter>(({ className }, ref) => {
  const region = useFiltersStore((s) => s.region);
  const sweetness = useFiltersStore((s) => s.sweetness);
  const color = useFiltersStore((s) => s.color);
  const grape = useFiltersStore((s) => s.grape);
  const minRating = useFiltersStore((s) => s.minRating);
  const vintage = useFiltersStore((s) => s.vintage);

  const setFilter = useFiltersStore((s) => s.setFilter);

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

  const regionOptions = useMemo(() => regions.map((r) => r.name), [regions]);

  const { data: grapesData, isLoading: isLoadingGrapes } = useGrapes({
    limit: 9999,
    region: region || undefined,
  });

  const grapeOptions = useMemo(
    () => (grapesData?.data?.grapes || []).map((g: { name: string }) => g.name),
    [grapesData],
  );

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleOpen = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const selectedRegionName = useMemo(() => {
    return regions.find((r) => r._id === region)?.name || '';
  }, [regions, region]);

  return (
    <StyledWineFilterContainer className={className} ref={ref}>
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
        options={grapeOptions}
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
    </StyledWineFilterContainer>
  );
});

export default WineFilter;
