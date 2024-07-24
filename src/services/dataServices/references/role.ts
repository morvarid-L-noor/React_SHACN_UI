import { apiRoutes } from '@/routes/api';
import { Axios } from '../axios';
import { useQuery } from '@tanstack/react-query';
import type { IRoleResponse } from '@/@types/roles';

export const useGetAllRoles = () =>
  useQuery({
    queryKey: [apiRoutes.references.getAllRoles],
    queryFn: async () => {
      const result: IRoleResponse = await Axios.get(apiRoutes.references.getAllRoles);
      return result.response;
    },
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24
  });
