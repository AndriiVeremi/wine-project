import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

import Container from '@/components/Common/Container';
import GrapeList from '@/components/Grape/GrapeList/GrapeList';
import AppPagination from '@/components/Common/AppPagination';
import { useGrapeFiltersStore } from '@/store/grape/grapeFiltersStore';
import { useGrapesStore } from '@/store/grape/grapesStore';
import { useGrapeQueryParams } from '@/hooks/useGrapeQueryParams';
import { ListSection } from '@/components/Common/ListStyles/ListStyles';

import { StyledSearchBar, StyledGrapeFilter } from './GrapesPage.styled';

const GrapesPage = () => {
  const grapes = useGrapesStore((s) => s.grapes);
  const loading = useGrapesStore((s) => s.loading);
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
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
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

      {!loading && grapes?.length === 0 && (
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
