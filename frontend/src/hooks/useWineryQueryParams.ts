import { useMemo } from 'react';
import { useWineriesFiltersStore } from '@/store/wineries/wineriesFiltersStore';

export const useWineryQueryParams = () => {
  const region = useWineriesFiltersStore((s) => s.region);
  const name = useWineriesFiltersStore((s) => s.name);
  const country = useWineriesFiltersStore((s) => s.country);

  return useMemo(() => {
    return {
      region: region || undefined,
      search: name || undefined,
      country: country || undefined,
    };
  }, [region, name, country]);
};
