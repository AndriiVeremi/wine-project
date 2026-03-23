import { useEffect } from 'react';
import Container from '@/components/Common/Container';
import GrapeList from '@/components/Grape/GrapeList/GrapeList';
import AppPagination from '@/components/Common/AppPagination';
import { useGrapeFiltersStore } from '@/store/grape/grapeFiltersStore';
import { useGrapesStore } from '@/store/grape/grapesStore';
import { useGrapeQueryParams } from '@/hooks/useGrapeQueryParams';
import GrapeCardSkeleton from '@/components/Common/Skeleton/GrapeCardSkeleton';
import { SkeletonGrid } from '@/components/Common/ListStyles/SkeletonGrid';
import { ListSection } from '@/components/Common/ListStyles/ListStyles';
import { notifyError } from '@/utils/toast';

import { StyledSearchBar, StyledGrapeFilter } from './GrapesPage.styled';

const GrapesPage = () => {
  const grapes = useGrapesStore((s) => s.grapes);
  const loading = useGrapesStore((s) => s.loading);
  const error = useGrapesStore((s) => s.error);
  const page = useGrapesStore((s) => s.page);
  const totalPages = useGrapesStore((s) => s.totalPages);
  const fetchGrapes = useGrapesStore((s) => s.fetchGrapes);

  const { nameInput, setNameInput, applyName } = useGrapeFiltersStore();

  const query = useGrapeQueryParams();

  useEffect(() => {
    fetchGrapes({
      ...query,
      page: 1,
      limit: 12,
    });
  }, [query, fetchGrapes]);

  useEffect(() => {
    if (error) notifyError(error);
  }, [error]);

  return (
    <Container>
      <StyledGrapeFilter />

      <StyledSearchBar
        value={nameInput}
        onChange={setNameInput}
        onSearch={applyName}
        placeholder="Search grape varieties..."
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
            <GrapeCardSkeleton key={i} />
          ))}
        </SkeletonGrid>
      )}

      {!loading && !error && grapes?.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '40px' }}>No grape varieties found.</p>
      )}

      {!loading && grapes?.length > 0 && (
        <ListSection>
          <GrapeList grapes={grapes} />
          <AppPagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => fetchGrapes({ ...query, page: p, limit: 12 })}
          />
        </ListSection>
      )}
    </Container>
  );
};

export default GrapesPage;
