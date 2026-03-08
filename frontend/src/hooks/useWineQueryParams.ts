import { useMemo } from 'react';
import { useFiltersStore } from '@/store/wine/filtersStore';
import type { WineQueryParams, WineColor, WineSweetness } from '@/types/wine';

export const useWineQueryParams = (): WineQueryParams => {
  const region = useFiltersStore((s) => s.region);
  const sweetness = useFiltersStore((s) => s.sweetness);
  const color = useFiltersStore((s) => s.color);
  const grape = useFiltersStore((s) => s.grape);
  const wineryId = useFiltersStore((s) => s.wineryId);
  const minRating = useFiltersStore((s) => s.minRating);
  const vintage = useFiltersStore((s) => s.vintage);

  return useMemo(() => {
    return {
      region: region ? region.toLowerCase() : undefined,
      sweetness: sweetness ? (sweetness.toLowerCase() as WineSweetness) : undefined,
      color: color ? (color.toLowerCase() as WineColor) : undefined,
      grape: grape ? grape.toLowerCase() : undefined,
      wineryId: wineryId || undefined,
      minRating: minRating ? Number(minRating) : undefined,
      vintage: vintage ? Number(vintage) : undefined,
    };
  }, [region, sweetness, color, grape, wineryId, minRating, vintage]);
};
