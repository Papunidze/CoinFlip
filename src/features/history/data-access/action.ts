import { mockApi } from '@shared/api/mockApi';
import { useQuery } from '@tanstack/react-query';

export const useGetHistory = () => {
  return useQuery({
    queryKey: ['history'],
    queryFn: mockApi.getHistory,
  });
};
