import type { TUserAssetContractByIdResponse, TUserAssetContractsResponse } from '@/@types/userAssetContracts';
import { apiRoutes } from '@/routes/api';
import { useQuery } from '@tanstack/react-query';
import { Axios } from './axios';
import type { TFavoriteAssetResponse, UserAssetCampaignResponse } from '@/@types/userAssetCampaign';
import type { UserAssetCampaignByIdResponse } from '@/@types/userAssetCampaignDetails';

// Assets
const getAllUserAssetContracts = async () => {
  const result: TUserAssetContractsResponse = await Axios.get(apiRoutes.userAssetContract.GETByFilter);
  return result.response;
};

const getAllOrganizationAssetContracts = async () => {
  const result: TUserAssetContractsResponse = await Axios.get(
    apiRoutes.userAssetContract.GETOrganizationAssetsByFilter
  );
  return result.response;
};

export const useGetUserAssetContractsQuery = () =>
  useQuery({
    queryKey: [apiRoutes.userAssetContract.GETByFilter],
    queryFn: getAllUserAssetContracts
  });

export const useGetOrganizationAssetContractsQuery = () =>
  useQuery({
    queryKey: [apiRoutes.userAssetContract.GETOrganizationAssetsByFilter],
    queryFn: getAllOrganizationAssetContracts
  });

export const useGetAssetContractByIdQuery = (id: string) =>
  useQuery({
    queryKey: [apiRoutes.userAssetContract.GETById(id)],
    queryFn: async () => {
      const result: TUserAssetContractByIdResponse = await Axios.get(`${apiRoutes.userAssetContract.GETById(id)}`);
      return result.response;
    }
  });

// Opportunities
export const useGetAllAssetCampaign = ({ limit, page }: RequestsFilterParameters) =>
  useQuery({
    queryKey: [apiRoutes.userAssetCampaign.GETALL({ limit, page })],
    queryFn: async () => {
      const result: UserAssetCampaignResponse = await Axios.get(
        `${apiRoutes.userAssetCampaign.GETALL({ limit, page })}`
      );
      return result.response;
    }
  });
export const useGetAssetCampaignById = (id: string) =>
  useQuery({
    queryKey: [apiRoutes.userAssetCampaign.GET(id)],
    queryFn: async () => {
      const result: UserAssetCampaignByIdResponse = await Axios.get(`${apiRoutes.userAssetCampaign.GET(id)}`);
      return result.response;
    }
  });

// Favorite Assets
export const createFavoriteAssetRequest = async (assetId: string) => {
  const result: TFavoriteAssetResponse = await Axios.post(apiRoutes.favoriteAsset.create, { assetId });
  return result;
};
