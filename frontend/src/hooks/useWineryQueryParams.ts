import { useMemo } from 'react';
import { useWineriesFiltersStore } from '@/store/wineries/wineriesFiltersStore';

export const useWineryQueryParams = () => {
  const region = useWineriesFiltersStore((s) => s.region);
  const name = useWineriesFiltersStore((s) => s.name);
  const country = useWineriesFiltersStore((s) => s.country);
  const page = useWineriesFiltersStore((s) => s.page);

  return useMemo(() => {
    return {
      page,
      region: region || undefined,
      search: name || undefined,
      country: country || undefined,
    };
  }, [region, name, country, page]);
};
