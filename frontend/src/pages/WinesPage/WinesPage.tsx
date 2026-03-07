import { useEffect } from 'react';
import { useWinesStore } from '@/store/wine/winesStore';
import WineList from '@/components/WineList/WineList';
import WineFilter from '@/components/WineFilter';

const WinesPage = () => {
  const wines = useWinesStore((s) => s.wines);
  const loading = useWinesStore((s) => s.loading);
  const error = useWinesStore((s) => s.error);
  const fetchWines = useWinesStore((s) => s.fetchWines);

  useEffect(() => {
    fetchWines({ page: 1, limit: 12 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (wines.length === 0) return <p>No wines found</p>;

  return (
    <section>
      <WineFilter />
      <WineList wines={wines} />
    </section>
  );
};

export default WinesPage;
