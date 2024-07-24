import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setConnectedWalletAddress } from '@/app/store/userSlice';
import { Button } from '@/components/ui/button';
import { apiRoutes } from '@/routes/api';
import { Axios } from '@/services/dataServices/axios';
import { useSDK } from '@metamask/sdk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StatusCell = ({ id, status, walletAddress }: { id: string; status: boolean; walletAddress: string }) => {
  const { sdk } = useSDK();
  const { id: pathId } = useParams();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const connectedWalletAdress = useAppSelector((state) => state.user.connectedWalletAdress);

  const { mutate: activateWallet, isPending: isActivateWalletPending } = useMutation({
    mutationFn: async () => Axios.post(apiRoutes.wallet.activateWalletAddress, { userExternalWalletId: id }),
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [apiRoutes.wallet.getWalletAddressById(pathId as string)] })
        .catch(console.error);
    }
  });

  const { mutate: deactivateWallet, isPending: isDeactivateWalletPending } = useMutation({
    mutationFn: async () => Axios.post(apiRoutes.wallet.deactivateWalletAddress, { userExternalWalletId: id }),
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: [apiRoutes.wallet.getWalletAddressById(pathId as string)] })
        .catch(console.error);
    }
  });
  const handleActivate = () => {
    dispatch(setConnectedWalletAddress(''));
    activateWallet();
  };
  const handleDeactivate = () => {
    dispatch(setConnectedWalletAddress(''));
    deactivateWallet();
  };
  const onDisconnectWallet = () => {
    dispatch(setConnectedWalletAddress(''));
  };
  const onConnectWallet = () => {
    dispatch(setConnectedWalletAddress(walletAddress));
  };
  const connectWalletToMetaMask = async () => {
    try {
      await sdk?.connect();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    connectWalletToMetaMask().catch((error) => {
      console.error('Failed to connect wallet to MetaMask:', error);
    });
  }, []);

  return status ? (
    <div className="space-x-2">
      <Button
        loading={isDeactivateWalletPending}
        type="button"
        variant="destructive"
        className="rounded-full"
        onClick={handleDeactivate}
      >
        Deactivate
      </Button>
      {walletAddress === connectedWalletAdress ? (
        <Button type="button" variant="primary" onClick={onDisconnectWallet}>
          Disconnect
        </Button>
      ) : (
        <Button type="button" variant={'secondary'} onClick={onConnectWallet}>
          Connect
        </Button>
      )}
    </div>
  ) : (
    <Button loading={isActivateWalletPending} type="button" variant="primary" onClick={handleActivate}>
      Activate
    </Button>
  );
};

export default StatusCell;
