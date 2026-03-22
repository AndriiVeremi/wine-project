import { useEffect } from 'react';
import WineList from '@/components/Wine/WineList/WineList';
import Container from '@/components/Common/Container';

import { useWinesStore } from '@/store/wine/winesStore';
import { useFiltersStore } from '@/store/wine/filtersStore';
import { useWineQueryParams } from '@/hooks/useWineQueryParams';

import { StyledSearchBar, StyledWineFilter } from './WinesPage.styled';

import { notifyError } from '@/utils/toast';
import AppPagination from '@/components/Common/AppPagination';
import { ListSection } from '@/components/Common/ListStyles/ListStyles';
import WineCardSkeleton from '@/components/Common/Skeleton/WineCardSkeleton';

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

  const query = useWineQueryParams();

  useEffect(() => {
    fetch({ page: 1, limit: 16, ...query });
  }, [query, fetch]);

  useEffect(() => {
    if (error) notifyError(error);
  }, [error]);

  return (
    <Container>
      <StyledWineFilter />
      <StyledSearchBar
        value={nameInput}
        onChange={setNameInput}
        onSearch={applyName}
        placeholder="Search wines..."
      />

      {loading && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginTop: '30px',
          }}
        >
          {[...Array(8)].map((_, i) => (
            <WineCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && !error && wines?.length === 0 && <p>No wines found</p>}
      {!loading && !error && wines.length > 0 && (
        <ListSection>
          <WineList wines={wines} />
          <AppPagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => fetch({ page: p, limit: 16, ...query })}
          />
        </ListSection>
      )}
    </Container>
  );
};

export default WinesPage;
