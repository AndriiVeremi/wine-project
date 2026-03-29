import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateUserApi } from '@/api/authApi';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useAuthStore } from '@/store/auth/authStore';
import type { UserProfile } from '@/types/auth';
import toast from 'react-hot-toast';

export const useProfile = () => {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: QUERY_KEYS.auth.profile(user?.uid),
    queryFn: async () => {
      const res = await getUserProfile();
      return res.data;
    },
    enabled: !!user?.uid,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProfileMutations = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const updateMutation = useMutation({
    mutationFn: (data: FormData | Partial<UserProfile>) => updateUserApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.auth.profile(user?.uid) });
      toast.success('Profile updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });

  return {
    updateProfile: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
};
