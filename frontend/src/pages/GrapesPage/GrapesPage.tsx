import { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

import Container from '@/components/common/Container';
import GrapeList from '@/components/GrapeList/GrapeList';
import AppPagination from '@/components/common/AppPagination';
import GrapeFilter from '@/components/GrapeFilter/GrapeFilter';
import { useGrapeFiltersStore } from '@/store/grape/grapeFiltersStore';
import { useGrapesStore } from '@/store/grape/grapesStore';

import { StyledSearchBar } from './GrapesPage.styled';

const GrapesPage = () => {
  const grapes = useGrapesStore((s) => s.grapes);
  const loading = useGrapesStore((s) => s.loading);
  const page = useGrapesStore((s) => s.page);
  const totalPages = useGrapesStore((s) => s.totalPages);
  const fetchGrapes = useGrapesStore((s) => s.fetchGrapes);

  const [currentPage, setCurrentPage] = useState(1);

  // Using filters from the dedicated grape store
  const { nameInput, setNameInput, applyName, name, type, region, body, acidity } =
    useGrapeFiltersStore();

  // Fetch data when filters or page change
  useEffect(() => {
    fetchGrapes({
      search: name || undefined,
      type: type || undefined,
      region: region || undefined,
      body: body || undefined,
      acidity: acidity || undefined,
      page: currentPage,
      limit: 16,
    });
  }, [name, type, region, body, acidity, currentPage, fetchGrapes]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [name, type, region, body, acidity]);

  return (
    <Container>
      <div style={{ marginBottom: '48px' }}>
        <GrapeFilter />
      </div>

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

      {!loading && grapes.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '40px' }}>No grape varieties found.</p>
      )}

      {!loading && grapes.length > 0 && <GrapeList grapes={grapes} />}

      <div style={{ marginTop: '40px' }}>
        <AppPagination page={page} totalPages={totalPages} onChange={(p) => setCurrentPage(p)} />
      </div>
    </Container>
  );
};

export default GrapesPage;
