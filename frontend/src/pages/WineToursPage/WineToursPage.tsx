import { useEffect } from 'react';
import Container from '@/components/Common/Container';
import AppPagination from '@/components/Common/AppPagination';
import { useToursStore } from '@/store/tours/toursStore';
import { useTourFiltersStore } from '@/store/tours/tourFiltersStore';
import { useTourQueryParams } from '@/hooks/useTourQueryParams';
import TourList from '@/components/Tour/TourList/TourList';
import { ListSection } from '@/components/Common/ListStyles/ListStyles';
import TourCardSkeleton from '@/components/Common/Skeleton/TourCardSkeleton';
import { SkeletonGrid } from '@/components/Common/ListStyles/SkeletonGrid';
import { StyledSearchBar, StyledTourFilter } from './WineToursPage.styled';
import { notifyError } from '@/utils/toast';

const TourPage = () => {
  const tours = useToursStore((s) => s.tours);
  const page = useToursStore((s) => s.page);
  const totalPages = useToursStore((s) => s.totalPages);
  const loading = useToursStore((s) => s.loading);
  const error = useToursStore((s) => s.error);
  const fetch = useToursStore((s) => s.fetch);

  const nameInput = useTourFiltersStore((s) => s.nameInput);
  const setNameInput = useTourFiltersStore((s) => s.setNameInput);
  const applyName = useTourFiltersStore((s) => s.applyName);

  const query = useTourQueryParams();

  useEffect(() => {
    fetch({ page: 1, limit: 12, ...query });
  }, [query, fetch]);

  useEffect(() => {
    if (error) notifyError(error);
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

      {loading && (
        <SkeletonGrid $columns={1} $tabletColumns={2} $desktopColumns={3} $gap="32px" $mt="30px">
          {[...Array(6)].map((_, i) => (
            <TourCardSkeleton key={i} />
          ))}
        </SkeletonGrid>
      )}

      {!loading && !error && tours.length === 0 && <p>No tours found</p>}
      {!loading && !error && tours.length > 0 && (
        <ListSection>
          <TourList tours={tours} />
          <AppPagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => fetch({ page: p, limit: 12, ...query })}
          />
        </ListSection>
      )}
    </Container>
  );
};

export default TourPage;
