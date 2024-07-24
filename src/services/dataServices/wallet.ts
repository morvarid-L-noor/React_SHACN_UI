import { apiRoutes } from '@/routes/api';
import { useQuery } from '@tanstack/react-query';
import { Axios } from './axios';
import type { AllThirdPartyIntegrationsResponse } from '@/@types/thirdPartyIntegrations';
import type { IAddWalletResponse, IDeleteWalletResponse } from '@/@types/wallet';
import type { TAddNewWalletForm } from '@/lib/schemas/wallet';

export const useGetWalletProvidersQuery = () =>
  useQuery({
    queryKey: [apiRoutes.wallet.getWalletProviders],
    queryFn: async () => {
      const result: AllThirdPartyIntegrationsResponse = await Axios.get(apiRoutes.wallet.getWalletProviders);
      return result.response;
    }
  });

export const addWallet = async (walletAddress: TAddNewWalletForm) => {
  const result: IAddWalletResponse = await Axios.post(apiRoutes.wallet.addNewWalletAddress, walletAddress);
  return result;
};

export const deleteWallet = async (id: string) => {
  const result: IDeleteWalletResponse = await Axios.delete(apiRoutes.wallet.deleteWalletAddressById(id));
  return result;
};
