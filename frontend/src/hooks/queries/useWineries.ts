import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getWineries,
  addWinery,
  updateWinery,
  deleteWinery,
  toggleWineryVip,
} from '@/api/wineries';
import { QUERY_KEYS } from '@/constants/queryKeys';
import type { WineriesQueryParams } from '@/types/wineries';
import toast from 'react-hot-toast';

export const useWineries = (params: WineriesQueryParams) => {
  return useQuery({
    queryKey: QUERY_KEYS.wineries.list(params),
    queryFn: () => getWineries(params),
  });
};

export const useWineryMutations = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addWinery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wineries.all });
      toast.success('Winery added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add winery');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => updateWinery(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wineries.all });
      toast.success('Winery updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update winery');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWinery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wineries.all });
      toast.success('Winery deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete winery');
    },
  });

  const vipMutation = useMutation({
    mutationFn: toggleWineryVip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wineries.all });
      toast.success('VIP status updated');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update VIP status');
    },
  });

  return {
    addWinery: addMutation.mutateAsync,
    updateWinery: updateMutation.mutateAsync,
    deleteWinery: deleteMutation.mutateAsync,
    toggleVip: vipMutation.mutateAsync,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isTogglingVip: vipMutation.isPending,
  };
};
