import { useState, useEffect } from 'react';
import { useGrapeFiltersStore } from '@/store/grape/grapeFiltersStore';
import { useLocationStore } from '@/store/location/locationStore';
import { getRegions } from '@/api/regions';
import FilterClearButton from '../buttons/FilterClearButton';
import { StyledDropDown, StyledWineFilterContainer } from '../WineFilter/WineFilter.styled';

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [regions, setRegions] = useState<RegionOption[]>([]);

  useEffect(() => {
    const fetchRegions = async () => {
      if (!country) return;
      try {
        const res = await getRegions(country);
        setRegions(res.data || []);
        // Скидаємо вибраний регіон при зміні країни
        filters.setFilter('region', '');
      } catch (error) {
        console.error('Failed to fetch regions', error);
        setRegions([]);
      }
    };
    fetchRegions();
  }, [country]);

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
          const id = regions.find((r) => r.name === val)?._id || '';
          filters.setFilter('region', id);
        }}
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
