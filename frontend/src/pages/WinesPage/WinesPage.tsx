import { useEffect, lazy, Suspense, useMemo, useRef } from 'react';
import Container from '@/components/Common/Container';
import FilterClearButton from '@/components/Buttons/FilterClearButton';
import AppPagination from '@/components/Common/AppPagination';
import WineCardSkeleton from '@/components/Common/Skeleton/WineCardSkeleton';
import { SkeletonGrid } from '@/components/Common/Skeleton/SkeletonGrid';
import { ListSection } from '@/components/Common/ListStyles/ListStyles';
import { StyledSearchBar, StyledWineFilter } from './WinesPage.styled';
import { useFiltersStore } from '@/store/wine/filtersStore';
import { useWineQueryParams } from '@/hooks/useWineQueryParams';
import { useDeviceType } from '@/hooks/useDeviceType';
import { useWines } from '@/hooks/queries/useWines';
import { notifyError } from '@/utils/toast';
import EmptyMessage from '@/components/Common/EmptyMessage/EmptyMessage';
import ErrorMessage from '@/components/Common/ErrorMessage/ErrorMessage';

const WineList = lazy(() => import('@/components/Wine/WineList/WineList'));

const WinesPage = () => {
  const nameInput = useFiltersStore((s) => s.nameInput);
  const setNameInput = useFiltersStore((s) => s.setNameInput);
  const applyName = useFiltersStore((s) => s.applyName);
  const clearFilters = useFiltersStore((s) => s.clearFilters);
  const setFilter = useFiltersStore((s) => s.setFilter);
  const filterRef = useRef<HTMLDivElement>(null);

  const query = useWineQueryParams();
  const { isMobile, isTablet } = useDeviceType();

  const { skeletonCount, limit } = useMemo(() => {
    if (isMobile) return { skeletonCount: 4, limit: 8 };
    if (isTablet) return { skeletonCount: 6, limit: 12 };
    return { skeletonCount: 8, limit: 16 };
  }, [isMobile, isTablet]);

  const { data, isLoading, isFetching, error, refetch } = useWines({ limit, ...query });

  const wines = data?.data?.wines || [];
  const page = data?.data?.page || 1;
  const totalPages = data?.data?.totalPages || 1;

  const handleClear = () => {
    clearFilters();
    if (window.innerWidth < 768 && filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (error) notifyError(error instanceof Error ? error.message : 'Failed to load wines');
  }, [error]);

  return (
    <Container>
      <StyledWineFilter ref={filterRef} />

      <StyledSearchBar
        value={nameInput}
        onChange={setNameInput}
        onSearch={applyName}
        placeholder="Search wines..."
      >
        <FilterClearButton onClick={handleClear}>Clear filters</FilterClearButton>
      </StyledSearchBar>

      {isLoading || isFetching ? (
        <SkeletonGrid
          $columns={1}
          $tabletColumns={2}
          $desktopColumns={4}
          $gap="20px"
          $tabletGap="24px"
          $desktopGap="30px"
          $mt="30px"
        >
          {[...Array(skeletonCount)].map((_, i) => (
            <WineCardSkeleton key={i} />
          ))}
        </SkeletonGrid>
      ) : error ? (
        <ErrorMessage
          message={
            error instanceof Error
              ? error.message
              : 'Failed to load wines. The server might be temporarily unavailable.'
          }
          onRetry={() => refetch()}
        />
      ) : (
        <>
          {!error && wines.length === 0 && (
            <EmptyMessage
              title="No wines found"
              message="We couldn't find any wines matching your criteria. Try adjusting your filters."
            />
          )}

          {!error && wines.length > 0 && (
            <ListSection>
              <Suspense
                fallback={
                  <SkeletonGrid
                    $columns={1}
                    $tabletColumns={2}
                    $desktopColumns={4}
                    $gap="20px"
                    $tabletGap="24px"
                    $desktopGap="30px"
                  >
                    {[...Array(skeletonCount)].map((_, i) => (
                      <WineCardSkeleton key={i} />
                    ))}
                  </SkeletonGrid>
                }
              >
                <WineList wines={wines} />
              </Suspense>

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

export default WinesPage;
