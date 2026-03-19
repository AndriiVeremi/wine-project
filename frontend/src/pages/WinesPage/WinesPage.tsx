import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

import WineList from '@/components/Wine/WineList/WineList';
import Container from '@/components/Common/Container';

import { useWinesStore } from '@/store/wine/winesStore';
import { useFiltersStore } from '@/store/wine/filtersStore';
import { useWineQueryParams } from '@/hooks/useWineQueryParams';

import { StyledSearchBar, StyledWineFilter } from './WinesPage.styled';

import { notifyError } from '@/utils/toast';
import AppPagination from '@/components/Common/AppPagination';
import { ListSection } from '@/components/Common/ListStyles/ListStyles';

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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Oval
            height={80}
            width={80}
            color="#841013"
            secondaryColor="#c27a7c"
            strokeWidth={4}
            strokeWidthSecondary={4}
          />
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
