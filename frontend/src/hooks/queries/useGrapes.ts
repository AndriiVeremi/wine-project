import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGrapes, getGrapeById, addGrape, updateGrape, deleteGrape } from '@/api/grapes';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { GrapesQueryParams, Grape } from '@/types/grape';
import toast from 'react-hot-toast';

export const useGrapes = (params: GrapesQueryParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.grapes.list(params),
    queryFn: () => getGrapes(params),
  });
};

export const useGrape = (id?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.grapes.detail(id || ''),
    queryFn: () => getGrapeById(id!),
    enabled: !!id,
  });
};

export const useGrapeMutations = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (data: FormData | Partial<Grape>) => addGrape(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.grapes.all });
      toast.success('Grape variety added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add grape variety');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData | Partial<Grape> }) =>
      updateGrape(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.grapes.all });
      toast.success('Grape variety updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update grape variety');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGrape,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.grapes.all });
      toast.success('Grape variety deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete grape variety');
    },
  });

  return {
    addGrape: addMutation.mutateAsync,
    updateGrape: updateMutation.mutateAsync,
    deleteGrape: deleteMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
