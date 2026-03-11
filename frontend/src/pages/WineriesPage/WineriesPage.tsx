import { useEffect, useState } from 'react';
import { useWineriesStore } from '@/store/wineries/wineriesStore';
import { useWineriesFiltersStore } from '@/store/wineries/wineriesFiltersStore';
import WineryList from '@/components/WineryList/WineryList';
import WineryFilter from '@/components/WineryFilter/WineryFilter';
import AppPagination from '@/components/common/AppPagination';
import Container from '@/components/common/Container';
import styled from 'styled-components';
import { Loader } from '@/components/common/Loader';

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 24px;
  color: var(--black-color, #000000);
`;

const WineriesPage = () => {
  const { wineries, fetchWineries, loading, error, totalPages } = useWineriesStore();
  const { country, region, name } = useWineriesFiltersStore();

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [country, region, name]);

  useEffect(() => {
    fetchWineries({
      page: currentPage,
      limit,
      country,
      region,
      search: name,
    });
  }, [fetchWineries, country, region, name, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      <PageHeader>
        <Title>Wineries</Title>
        <WineryFilter />
      </PageHeader>

      {loading && <Loader />}

      {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <WineryList wineries={wineries} />

          {totalPages > 1 && (
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
              <AppPagination
                page={currentPage}
                totalPages={totalPages}
                onChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default WineriesPage;
