import { useEffect } from 'react';
import Container from '@/components/Common/Container';
import AppPagination from '@/components/Common/AppPagination';
import { useTourFiltersStore } from '@/store/tours/tourFiltersStore';
import { useTourQueryParams } from '@/hooks/useTourQueryParams';
import { useTours } from '@/hooks/queries/useTours';
import TourList from '@/components/Tour/TourList/TourList';
import { ListSection } from '@/components/Common/ListStyles/ListStyles';
import TourCardSkeleton from '@/components/Common/Skeleton/TourCardSkeleton';
import { SkeletonGrid } from '@/components/Common/ListStyles/SkeletonGrid';
import { StyledSearchBar, StyledTourFilter } from './WineToursPage.styled';
import { notifyError } from '@/utils/toast';

const TourPage = () => {
  const { nameInput, setNameInput, applyName, setFilter } = useTourFiltersStore();

  const query = useTourQueryParams();
  const { data, isLoading, isFetching, error } = useTours({ limit: 12, ...query });

  const tours = data?.data?.tours || [];
  const page = data?.data?.page || 1;
  const totalPages = data?.data?.totalPages || 1;

  useEffect(() => {
    if (error) notifyError(error instanceof Error ? error.message : 'Failed to load tours');
  }, [error]);

  return (
    <Container>
      <StyledTourFilter />
      <StyledSearchBar
        value={nameInput}
        onChange={setNameInput}
        onSearch={applyName}
        placeholder="Search tours..."
      />

      {isLoading || isFetching ? (
        <SkeletonGrid $columns={1} $tabletColumns={2} $desktopColumns={3} $gap="32px" $mt="30px">
          {[...Array(6)].map((_, i) => (
            <TourCardSkeleton key={i} />
          ))}
        </SkeletonGrid>
      ) : (
        <>
          {!error && tours.length === 0 && <p>No tours found</p>}
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
