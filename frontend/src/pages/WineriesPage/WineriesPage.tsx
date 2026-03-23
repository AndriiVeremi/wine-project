import { useEffect } from 'react';
import { useWineriesStore } from '@/store/wineries/wineriesStore';
import { useWineriesFiltersStore } from '@/store/wineries/wineriesFiltersStore';
import { useWineryQueryParams } from '@/hooks/useWineryQueryParams';

import WineryList from '@/components/Winery/WineryList/WineryList';
import AppPagination from '@/components/Common/AppPagination';
import Container from '@/components/Common/Container';
import WineryCardSkeleton from '@/components/Common/Skeleton/WineryCardSkeleton';
import { SkeletonGrid } from '@/components/Common/ListStyles/SkeletonGrid';
import { ListSection } from '@/components/Common/ListStyles/ListStyles';

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

      {loading && (
        <SkeletonGrid
          $columns={1}
          $tabletColumns={2}
          $desktopColumns={3}
          $gap="20px"
          $tabletGap="30px"
        >
          {[...Array(6)].map((_, i) => (
            <WineryCardSkeleton key={i} />
          ))}
        </SkeletonGrid>
      )}

      {!loading && !error && wineries?.length === 0 && <p>No wineries found</p>}

      {!loading && !error && wineries.length > 0 && (
        <ListSection>
          <WineryList wineries={wineries} />
          <AppPagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => fetchWineries({ page: p, limit: 12, ...query })}
          />
        </ListSection>
      )}
    </Container>
  );
};

export default WineriesPage;
