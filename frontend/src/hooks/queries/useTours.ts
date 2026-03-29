import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTours, getTourById, addTour, updateTour, deleteTour } from '@/api/tours';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { TourQueryParams } from '@/types/tours';
import toast from 'react-hot-toast';

export const useTours = (params: TourQueryParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.tours.list(params),
    queryFn: () => getTours(params),
  });
};

export const useTour = (id?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.tours.detail(id || ''),
    queryFn: () => getTourById(id!),
    enabled: !!id,
  });
};

export const useTourMutations = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tours.all });
      toast.success('Tour added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add tour');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => updateTour(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tours.all });
      toast.success('Tour updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update tour');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tours.all });
      toast.success('Tour deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete tour');
    },
  });

  return {
    addTour: addMutation.mutateAsync,
    updateTour: updateMutation.mutateAsync,
    deleteTour: deleteMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
