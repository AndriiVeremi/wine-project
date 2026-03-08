import { useEffect } from 'react';
import WineList from '@/components/WineList/WineList';
import { useWinesStore } from '@/store/wine/winesStore';
import { useWineQueryParams } from '@/hooks/useWineQueryParams';
import { useFiltersStore } from '@/store/wine/filtersStore';
import { useDebounce } from '@/hooks/useDebounce';
import { StyledSearchBar, StyledWineFilter } from './WinesPage.styled';

const WinesPage = () => {
  const wines = useWinesStore((s) => s.wines);
  const loading = useWinesStore((s) => s.loading);
  const error = useWinesStore((s) => s.error);
  const fetchWines = useWinesStore((s) => s.fetchWines);

  const nameInput = useFiltersStore((s) => s.nameInput);
  const setNameInput = useFiltersStore((s) => s.setNameInput);
  const applyName = useFiltersStore((s) => s.applyName);

  const debouncedName = useDebounce(nameInput, 300);

  const query = useWineQueryParams();

  useEffect(() => {}, [debouncedName]);

  useEffect(() => {
    fetchWines({ page: 1, limit: 16, ...query });
  }, [query, fetchWines]);

  return (
    <>
      <StyledWineFilter />
      <StyledSearchBar
        value={nameInput}
        onChange={setNameInput}
        onSearch={applyName}
        placeholder="Search wines..."
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && wines?.length === 0 && <p>No wines found</p>}
      {!loading && !error && wines.length > 0 && <WineList wines={wines} />}
    </>
  );
};

export default WinesPage;
