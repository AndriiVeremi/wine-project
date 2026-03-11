import { useState } from 'react';
import {
  StyledDropDown,
  StyledWineryFilterContainer,
  SearchFieldWrapper,
} from './WineryFilter.styled';
import { useWineriesFiltersStore } from '@/store/wineries/wineriesFiltersStore';
import { useLocationStore } from '@/store/location/locationStore';
import FilterClearButton from '../buttons/FilterClearButton';
import SearchBar from '@/components/common/SearchBar';

const WineryFilter = () => {
  const { region, nameInput, setFilter, setNameInput, applyName, clearFilters } =
    useWineriesFiltersStore();

  const { regions, loading: regionsLoading } = useLocationStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleOpen = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <StyledWineryFilterContainer>
      {/* 1. Регіон (Беремо з глобального стора) */}
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

      {/* 2. Пошук */}
      <SearchFieldWrapper>
        <SearchBar
          value={nameInput}
          onChange={setNameInput}
          onSearch={applyName}
          placeholder="Search wineries..."
        />
      </SearchFieldWrapper>

      {/* 3. Очистка */}
      <FilterClearButton onClick={clearFilters}>Clear</FilterClearButton>
    </StyledWineryFilterContainer>
  );
};

export default WineryFilter;
