import { useMemo } from 'react';
import { useGrapeFiltersStore } from '@/store/grape/grapeFiltersStore';

export const useGrapeQueryParams = () => {
  const name = useGrapeFiltersStore((s) => s.name);
  const type = useGrapeFiltersStore((s) => s.type);
  const region = useGrapeFiltersStore((s) => s.region);
  const body = useGrapeFiltersStore((s) => s.body);
  const acidity = useGrapeFiltersStore((s) => s.acidity);
  const page = useGrapeFiltersStore((s) => s.page);

  return useMemo(() => {
    return {
      page,
      search: name || undefined,
      type: type || undefined,
      region: region || undefined,
      body: body || undefined,
      acidity: acidity || undefined,
    };
  }, [name, type, region, body, acidity, page]);
};
