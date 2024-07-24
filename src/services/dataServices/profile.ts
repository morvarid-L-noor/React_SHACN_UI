import type { GetProfileResponse, ProfilePicUpdateResponse } from '@/@types/profile';
import type { TProfilePictureUpdateParameters, TProfileUpdateParameters } from '@/lib/schemas/profile';
import { apiRoutes } from '@/routes/api';
import { useQuery } from '@tanstack/react-query';
import { Axios } from './axios';
import { roleCookieName } from '@/lib/constants';
import cookies from 'js-cookie';

export const useGetProfileQuery = () =>
  useQuery({
    queryKey: [apiRoutes.profile.GET],
    queryFn: async () => {
      const result: GetProfileResponse = await Axios.get(apiRoutes.profile.GET);
      cookies.set(roleCookieName, result.response.role);
      return result.response;
    }
  });

export const updateProfileRequest = async (data: TProfileUpdateParameters) => {
  const result: GetProfileResponse = await Axios.patch(apiRoutes.profile.update, data);
  return result.response;
};

export const uploadProfilePicToS3Request = async (data: TProfilePictureUpdateParameters) => {
  const result: ProfilePicUpdateResponse = await Axios.post(apiRoutes.profile.updateProfilePicture, data);
  return result.response;
};
