import { useEffect } from 'react';
import { useWineriesStore } from '@/store/wineries/wineriesStore';
import { useWineriesFiltersStore } from '@/store/wineries/wineriesFiltersStore';
import { useWineryQueryParams } from '@/hooks/useWineryQueryParams';

import WineryList from '@/components/WineryList/WineryList';
import AppPagination from '@/components/common/AppPagination';
import Container from '@/components/common/Container';
import { Loader } from '@/components/common/Loader';

import { StyledSearchBar, StyledWineryFilter } from './WineriesPage.styled';
import { notifyError } from '@/utils/toast';

const WineriesPage = () => {
  const { wineries, fetchWineries, loading, error, page, totalPages } = useWineriesStore();

  const nameInput = useWineriesFiltersStore((s) => s.nameInput);
  const setNameInput = useWineriesFiltersStore((s) => s.setNameInput);
  const applyName = useWineriesFiltersStore((s) => s.applyName);

  const query = useWineryQueryParams();

  useEffect(() => {
    fetchWineries({
      page: 1,
      limit: 12,
      ...query,
    });
  }, [fetchWineries, query]);

  useEffect(() => {
    if (error) notifyError(error);
  }, [error]);

  return (
    <Container>
      <StyledWineryFilter />
      <StyledSearchBar
        value={nameInput}
        onChange={setNameInput}
        onSearch={applyName}
        placeholder="Search wineries..."
      />

      {loading && <Loader />}

      {!loading && !error && wineries?.length === 0 && <p>No wineries found</p>}

      {!loading && !error && wineries.length > 0 && <WineryList wineries={wineries} />}

      <AppPagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => fetchWineries({ page: p, limit: 12, ...query })}
      />
    </Container>
  );
};

export default WineriesPage;
