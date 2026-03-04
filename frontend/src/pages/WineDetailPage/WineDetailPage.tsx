import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useWineDetailStore } from '@/store/wine/wineDetailsStore';

const WineDetailPage = () => {
  const { id } = useParams();

  const wine = useWineDetailStore((s) => s.wine);
  const loading = useWineDetailStore((s) => s.loading);
  const error = useWineDetailStore((s) => s.error);
  const fetchWine = useWineDetailStore((s) => s.fetchWine);
  console.log(wine);
  useEffect(() => {
    if (id) fetchWine(id);
  }, [id, fetchWine]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!wine) return <p>Wine not found</p>;

  return (
    <section>
      <h1>{wine.name}</h1>
      <img src={wine.imageUrl} alt={wine.name} />
      <p>Year: {wine.color}</p>
      <p>Price: {wine.price} £</p>
      <p>Description: {wine.description}</p>
    </section>
  );
};

export default WineDetailPage;
