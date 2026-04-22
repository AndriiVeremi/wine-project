import { useEffect } from 'react';
import Container from '@/components/Common/Container';
import GrapeList from '@/components/Grape/GrapeList/GrapeList';
import AppPagination from '@/components/Common/AppPagination';
import { useGrapeFiltersStore } from '@/store/grape/grapeFiltersStore';
import { useGrapeQueryParams } from '@/hooks/useGrapeQueryParams';
import { useGrapes } from '@/hooks/queries/useGrapes';
import GrapeCardSkeleton from '@/components/Common/Skeleton/GrapeCardSkeleton';
import { SkeletonGrid } from '@/components/Common/Skeleton/SkeletonGrid';
import { ListSection } from '@/components/Common/ListStyles/ListStyles';
import { notifyError } from '@/utils/toast';
import EmptyMessage from '@/components/Common/EmptyMessage/EmptyMessage';
import ErrorMessage from '@/components/Common/ErrorMessage/ErrorMessage';

import { StyledSearchBar, StyledGrapeFilter } from './GrapesPage.styled';

const GrapesPage = () => {
  const { nameInput, setNameInput, applyName, setFilter } = useGrapeFiltersStore();

  const query = useGrapeQueryParams();
  const { data, isLoading, isFetching, error, refetch } = useGrapes({ ...query, limit: 12 });

  const grapes = data?.data?.grapes || [];
  const page = data?.data?.page || 1;
  const totalPages = data?.data?.totalPages || 1;

  useEffect(() => {
    if (error)
      notifyError(error instanceof Error ? error.message : 'Failed to load grape varieties');
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

      {isLoading || isFetching ? (
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
      ) : error ? (
        <ErrorMessage
          message={
            error instanceof Error
              ? error.message
              : 'Failed to load grape varieties. The server might be temporarily unavailable.'
          }
          onRetry={() => refetch()}
        />
      ) : (
        <>
          {!error && grapes.length === 0 && (
            <EmptyMessage
              title="No grapes found"
              message="No grape varieties match your request. Try searching for a different variety."
            />
          )}

          {grapes?.length > 0 && (
            <ListSection>
              <GrapeList grapes={grapes} />
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

export default GrapesPage;
