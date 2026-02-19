import { mockApi } from '@shared/api/mockApi';
import type { UserData } from '@shared/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: mockApi.getUserData,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userData }: { userData: UserData }) =>
      mockApi.createUser(userData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
