import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

import Container from '@/components/common/Container';
import AppPagination from '@/components/common/AppPagination';

import { useToursStore } from '@/store/tours/toursStore';
import TourList from '@/components/TourList/TourList';

import { notifyError } from '@/utils/toast';

const TourPage = () => {
  const tours = useToursStore((s) => s.tours);
  const page = useToursStore((s) => s.page);
  const totalPages = useToursStore((s) => s.totalPages);
  const loading = useToursStore((s) => s.loading);
  const error = useToursStore((s) => s.error);
  const fetch = useToursStore((s) => s.fetch);

  useEffect(() => {
    fetch({ page: 1, limit: 12 });
  }, [fetch]);

  useEffect(() => {
    if (error) notifyError(error);
  }, [error]);

  return (
    <Container>
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

      {!loading && !error && tours.length === 0 && <p>No tours found</p>}
      {!loading && !error && tours.length > 0 && <TourList tours={tours} />}

      <AppPagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => fetch({ page: p, limit: 12 })}
      />
    </Container>
  );
};

export default TourPage;
