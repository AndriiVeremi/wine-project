import { useEffect } from 'react';

import WineList from '@/components/WineList/WineList';
import WineFilter from '@/components/WineFilter';
import { useWinesStore } from '@/store/wine/winesStore';
import { useWineQueryParams } from '@/hooks/useWineQueryParams';

const WinesPage = () => {
  const wines = useWinesStore((s) => s.wines);
  const loading = useWinesStore((s) => s.loading);
  const error = useWinesStore((s) => s.error);
  const fetchWines = useWinesStore((s) => s.fetchWines);

  const query = useWineQueryParams();

  useEffect(() => {
    fetchWines({ page: 1, limit: 12, ...query });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <section>
      <WineFilter />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && wines?.length === 0 && <p>No wines found</p>}
      {!loading && !error && wines.length > 0 && <WineList wines={wines} />}
    </section>
  );
};

export default WinesPage;
