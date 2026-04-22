import { useEffect, useRef } from 'react';
import Container from '@/components/Common/Container';
import AppPagination from '@/components/Common/AppPagination';
import { useTourFiltersStore } from '@/store/tours/tourFiltersStore';
import { useTourQueryParams } from '@/hooks/useTourQueryParams';
import { useTours } from '@/hooks/queries/useTours';
import TourList from '@/components/Tour/TourList/TourList';
import { ListSection } from '@/components/Common/ListStyles/ListStyles';
import TourCardSkeleton from '@/components/Common/Skeleton/TourCardSkeleton';
import { SkeletonGrid } from '@/components/Common/Skeleton/SkeletonGrid';
import { StyledSearchBar, StyledTourFilter } from './WineToursPage.styled';
import { notifyError } from '@/utils/toast';
import EmptyMessage from '@/components/Common/EmptyMessage/EmptyMessage';
import ErrorMessage from '@/components/Common/ErrorMessage/ErrorMessage';
import FilterClearButton from '@/components/Buttons/FilterClearButton';

const TourPage = () => {
  const { nameInput, setNameInput, applyName, clearFilters, setFilter } = useTourFiltersStore();
  const filterRef = useRef<HTMLDivElement>(null);

  const query = useTourQueryParams();
  const { data, isLoading, isFetching, error, refetch } = useTours({ limit: 12, ...query });

  const tours = data?.data?.tours || [];
  const page = data?.data?.page || 1;
  const totalPages = data?.data?.totalPages || 1;

  const handleClear = () => {
    clearFilters();
    if (window.innerWidth < 768 && filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (error) notifyError(error instanceof Error ? error.message : 'Failed to load tours');
  }, [error]);

  return (
    <Container>
      <StyledTourFilter ref={filterRef} />
      <StyledSearchBar
        value={nameInput}
        onChange={setNameInput}
        onSearch={applyName}
        placeholder="Search tours..."
      >
        <FilterClearButton onClick={handleClear}>Clear filters</FilterClearButton>
      </StyledSearchBar>

      {isLoading || isFetching ? (
        <SkeletonGrid $columns={1} $tabletColumns={2} $desktopColumns={3} $gap="32px" $mt="30px">
          {[...Array(6)].map((_, i) => (
            <TourCardSkeleton key={i} />
          ))}
        </SkeletonGrid>
      ) : error ? (
        <ErrorMessage
          message={
            error instanceof Error
              ? error.message
              : 'Failed to load tours. The server might be temporarily unavailable.'
          }
          onRetry={() => refetch()}
        />
      ) : (
        <>
          {!error && tours.length === 0 && (
            <EmptyMessage
              title="No tours found"
              message="We couldn't find any tours matching your criteria. Check back later or try other dates."
            />
          )}
          {!error && tours.length > 0 && (
            <ListSection>
              <TourList tours={tours} />
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

export default TourPage;
