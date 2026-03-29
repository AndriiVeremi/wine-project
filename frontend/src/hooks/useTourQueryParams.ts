import { useMemo } from 'react';
import { useTourFiltersStore } from '@/store/tours/tourFiltersStore';
import type { TourQueryParams } from '@/types/tours';

export const useTourQueryParams = (): TourQueryParams => {
  const region = useTourFiltersStore((s) => s.region);
  const name = useTourFiltersStore((s) => s.name);
  const page = useTourFiltersStore((s) => s.page);

  return useMemo(() => {
    return {
      page,
      region: region || undefined,
      name: name || undefined,
    };
  }, [region, name, page]);
};
