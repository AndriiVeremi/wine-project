import { useEffect, lazy, Suspense, useMemo, useRef } from 'react';

import Container from '@/components/Common/Container';
import FilterClearButton from '@/components/Buttons/FilterClearButton';
import AppPagination from '@/components/Common/AppPagination';
import WineCardSkeleton from '@/components/Common/Skeleton/WineCardSkeleton';
import { SkeletonGrid } from '@/components/Common/ListStyles/SkeletonGrid';
import { ListSection } from '@/components/Common/ListStyles/ListStyles';

import { SearchAndClearWrapper, StyledSearchBar, StyledWineFilter } from './WinesPage.styled';

import { useWinesStore } from '@/store/wine/winesStore';
import { useFiltersStore } from '@/store/wine/filtersStore';

import { useWineQueryParams } from '@/hooks/useWineQueryParams';
import { useDeviceType } from '@/hooks/useDeviceType';

import { notifyError } from '@/utils/toast';

const WineList = lazy(() => import('@/components/Wine/WineList/WineList'));

const WinesPage = () => {
  const wines = useWinesStore((s) => s.wines);
  const page = useWinesStore((s) => s.page);
  const totalPages = useWinesStore((s) => s.totalPages);
  const loading = useWinesStore((s) => s.loading);
  const error = useWinesStore((s) => s.error);
  const fetch = useWinesStore((s) => s.fetch);

  const nameInput = useFiltersStore((s) => s.nameInput);
  const setNameInput = useFiltersStore((s) => s.setNameInput);
  const applyName = useFiltersStore((s) => s.applyName);
  const clearFilters = useFiltersStore((s) => s.clearFilters);
  const filterRef = useRef<HTMLDivElement>(null);

  const query = useWineQueryParams();
  const { isMobile, isTablet } = useDeviceType();

  const { skeletonCount, limit } = useMemo(() => {
    if (isMobile) return { skeletonCount: 4, limit: 8 };
    if (isTablet) return { skeletonCount: 6, limit: 12 };
    return { skeletonCount: 8, limit: 16 };
  }, [isMobile, isTablet]);

  const handleClear = () => {
    clearFilters();
    if (window.innerWidth < 768 && filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    fetch({ page: 1, limit, ...query });
  }, [limit, query, fetch]);

  useEffect(() => {
    if (error) notifyError(error);
  }, [error]);

  return (
    <Container>
      <StyledWineFilter ref={filterRef} />

      <SearchAndClearWrapper>
        <StyledSearchBar
          value={nameInput}
          onChange={setNameInput}
          onSearch={applyName}
          placeholder="Search wines..."
        />

        <FilterClearButton onClick={handleClear}>Clear filters</FilterClearButton>
      </SearchAndClearWrapper>

      {loading && (
        <SkeletonGrid $min="280px" $gap="24px" $mt="30px">
          {[...Array(skeletonCount)].map((_, i) => (
            <WineCardSkeleton key={i} />
          ))}
        </SkeletonGrid>
      )}

      {!loading && !error && wines.length === 0 && <p>No wines found</p>}

      {!loading && !error && wines.length > 0 && (
        <ListSection>
          <Suspense fallback={null}>
            <WineList wines={wines} />
          </Suspense>

          <AppPagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => fetch({ page: p, limit, ...query })}
          />
        </ListSection>
      )}
    </Container>
  );
};

export default WinesPage;
