import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

import WineList from '@/components/WineList/WineList';

import { useWinesStore } from '@/store/wine/winesStore';
import { useFiltersStore } from '@/store/wine/filtersStore';
import { useWineQueryParams } from '@/hooks/useWineQueryParams';

import { StyledSearchBar, StyledWineFilter } from './WinesPage.styled';

import { notifyError } from '@/utils/toast';
import AppPagination from '@/components/common/AppPagination';

const WinesPage = () => {
  const wines = useWinesStore((s) => s.wines);
  const page = useWinesStore((s) => s.page);
  const totalPages = useWinesStore((s) => s.totalPages);
  const loading = useWinesStore((s) => s.loading);
  const error = useWinesStore((s) => s.error);
  const fetchWines = useWinesStore((s) => s.fetchWines);

  const nameInput = useFiltersStore((s) => s.nameInput);
  const setNameInput = useFiltersStore((s) => s.setNameInput);
  const applyName = useFiltersStore((s) => s.applyName);

  const query = useWineQueryParams();

  useEffect(() => {
    fetchWines({ page: 1, limit: 16, ...query });
  }, [query, fetchWines]);

  useEffect(() => {
    if (error) notifyError(error);
  }, [error]);

  return (
    <>
      <StyledWineFilter />
      <StyledSearchBar
        value={nameInput}
        onChange={setNameInput}
        onSearch={applyName}
        placeholder="Search wines..."
      />

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Oval
            height={80}
            width={80}
            color="#841013"
            secondaryColor="#c27a7c"
            strokeWidth={4}
            strokeWidthSecondary={4}
          />
        </div>
      )}

      {!loading && !error && wines?.length === 0 && <p>No wines found</p>}
      {!loading && !error && wines.length > 0 && <WineList wines={wines} />}
      <AppPagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => fetchWines({ page: p, limit: 16, ...query })}
      />
    </>
  );
};

export default WinesPage;
