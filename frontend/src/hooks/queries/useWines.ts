import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWines, addWine, updateWine, deleteWine, getWineById } from '@/api/wines';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { WineQueryParams } from '@/types/wine';
import toast from 'react-hot-toast';

export const useWines = (params: WineQueryParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.wines.list(params),
    queryFn: () => getWines(params),
  });
};

export const useWine = (id?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.wines.detail(id || ''),
    queryFn: () => getWineById(id!),
    enabled: !!id,
  });
};

export const useWineMutations = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addWine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wines.all });
      toast.success('Wine added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add wine');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => updateWine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wines.all });
      toast.success('Wine updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update wine');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wines.all });
      toast.success('Wine deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete wine');
    },
  });

  return {
    addWine: addMutation.mutateAsync,
    updateWine: updateMutation.mutateAsync,
    deleteWine: deleteMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
