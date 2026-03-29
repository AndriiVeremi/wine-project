import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFavorites, addWineToFavorites, removeWineFromFavorites } from '@/api/userApi';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useAuthStore } from '@/store/auth/authStore';
import type { Wine } from '@/types/wine';
import toast from 'react-hot-toast';

export const useFavorites = () => {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: QUERY_KEYS.favorites.all,
    queryFn: async () => {
      const res = await getFavorites();
      return res.data;
    },
    enabled: !!user,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFavoriteMutations = () => {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: async ({ wineId, isFavorite }: { wineId: string; isFavorite: boolean }) => {
      if (isFavorite) {
        return removeWineFromFavorites(wineId);
      } else {
        return addWineToFavorites(wineId);
      }
    },
    onMutate: async ({ wineId, isFavorite }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.favorites.all });

      // Snapshot the previous value
      const previousFavorites = queryClient.getQueryData<Wine[]>(QUERY_KEYS.favorites.all);

      // Optimistically update to the new value
      if (previousFavorites) {
        if (isFavorite) {
          queryClient.setQueryData(
            QUERY_KEYS.favorites.all,
            previousFavorites.filter((w) => w._id !== wineId),
          );
        } else {
          // Note: We don't have the full wine object here,
          // but we usually only care about the ID for immediate UI feedback.
          // The actual data will be synced after mutation.
        }
      }

      return { previousFavorites };
    },
    onError: (_err, _newVal, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(QUERY_KEYS.favorites.all, context.previousFavorites);
      }
      toast.error('Failed to update favorites');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.favorites.all });
    },
  });

  return {
    toggleFavorite: toggleMutation.mutateAsync,
    isToggling: toggleMutation.isPending,
  };
};
