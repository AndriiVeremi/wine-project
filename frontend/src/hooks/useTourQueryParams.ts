import { useMemo } from 'react';
import { useTourFiltersStore } from '@/store/tours/tourFiltersStore';
import type { TourQueryParams } from '@/types/tours';

export const useTourQueryParams = (): TourQueryParams => {
  const region = useTourFiltersStore((s) => s.region);
  const name = useTourFiltersStore((s) => s.name);

  return useMemo(() => {
    return {
      region: region || undefined,
      name: name || undefined,
    };
  }, [region, name]);
};
