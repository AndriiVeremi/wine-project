import { useEffect } from 'react';
import { useWineriesFiltersStore } from '@/store/wineries/wineriesFiltersStore';
import { useWineryQueryParams } from '@/hooks/useWineryQueryParams';
import { useWineries } from '@/hooks/queries/useWineries';

import WineryList from '@/components/Winery/WineryList/WineryList';
import AppPagination from '@/components/Common/AppPagination';
import Container from '@/components/Common/Container';
import WineryCardSkeleton from '@/components/Common/Skeleton/WineryCardSkeleton';
import { SkeletonGrid } from '@/components/Common/Skeleton/SkeletonGrid';
import { ListSection } from '@/components/Common/ListStyles/ListStyles';

import { StyledSearchBar, StyledWineryFilter } from './WineriesPage.styled';
import { notifyError } from '@/utils/toast';
import EmptyMessage from '@/components/Common/EmptyMessage/EmptyMessage';

const WineriesPage = () => {
  const nameInput = useWineriesFiltersStore((s) => s.nameInput);
  const setNameInput = useWineriesFiltersStore((s) => s.setNameInput);
  const applyName = useWineriesFiltersStore((s) => s.applyName);
  const setFilter = useWineriesFiltersStore((s) => s.setFilter);

  const query = useWineryQueryParams();
  const { data, isLoading, isFetching, error } = useWineries({ limit: 12, ...query });

  const wineries = data?.data?.wineries || [];
  const page = data?.data?.page || 1;
  const totalPages = data?.data?.totalPages || 1;

  useEffect(() => {
    if (error) notifyError(error instanceof Error ? error.message : 'Failed to load wineries');
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

      {isLoading || isFetching ? (
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
      ) : (
        <>
          {!error && wineries.length === 0 && (
            <EmptyMessage
              title="No wineries found"
              message="We couldn't find any wineries matching your search. Try adjusting your filters."
            />
          )}

          {!error && wineries.length > 0 && (
            <ListSection>
              <WineryList wineries={wineries} />
              <AppPagination
                page={page}
                totalPages={totalPages}
                onChange={(p) => setFilter('page', p)}
              />
            </ListSection>
          )}
        </>
      )}
    </Container>
  );
};

export default WineriesPage;
