import type { ThirdPartyIntegrationResponse } from '@/@types/thirdPartyIntegrations';
import Spinner from '@/components/loadings/spinner';
import AddNewWalletModal from '@/components/modals/AddNewWallet';
import PageHeader from '@/components/page_header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { TAddNewWalletForm } from '@/lib/schemas/wallet';
import { apiRoutes } from '@/routes/api';
import { Axios } from '@/services/dataServices/axios';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import WalletsTable from './wallets-table';
import { addWallet } from '@/services/dataServices/wallet';
import ActionWalletSuccessModal from '@/components/modals/ActionWalletSuccessModal';

const WalletDetailsPage = () => {
  const [isAddNewWalletModalOpen, setIsAddNewWalletModalOpen] = useState(false);
  const [addWalletSuccessModalOpen, setAddWalletSuccessModalOpen] = useState(false);

  const { t } = useTranslation();
  const { id } = useParams();
  if (!id) {
    return <Spinner />;
  }
  const queryClient = useQueryClient();

  // Success of Add Wallet Modal
  const onToggleAddWalletSuccessModel = () => {
    setAddWalletSuccessModalOpen((s) => !s);
    queryClient.invalidateQueries({ queryKey: [apiRoutes.wallet.getWalletAddressById(id)] }).catch(console.error);
  };

  // Service Calls
  const { data: wallet, isPending } = useQuery({
    queryKey: [apiRoutes.wallet.getWalletProviderById(id), id],
    queryFn: async ({ queryKey }) => {
      const result: ThirdPartyIntegrationResponse = await Axios.get(
        apiRoutes.wallet.getWalletProviderById(queryKey[1])
      );
      return result.response;
    }
  });
  const { mutate: addWalletAddress, isPending: isAddignNewWalletPending } = useMutation({
    mutationFn: addWallet,
    onSuccess: (data) => {
      if (data.success) {
        setAddWalletSuccessModalOpen(true);
      }
    }
  });
  // Add New Modal Handlers
  const onAddNewWalletModalToggle = () => {
    setIsAddNewWalletModalOpen((s) => !s);
  };
  const onAddNewWalletSubmit = ({ walletAddress }: TAddNewWalletForm) => {
    const data = {
      thirdPartyIntegrationId: wallet?._id,
      name: wallet?.name,
      walletAddress
    };
    addWalletAddress(data);
    setIsAddNewWalletModalOpen(false);
  };
  if (!wallet || isPending) {
    return <Spinner />;
  }
  return (
    <>
      <div className="space-y-2">
        <PageHeader title={t('walletDetails.page_title')} description={t('walletDetails.page_description')} />
        <p className="mb-3 text-lg">{wallet?.name} Wallet Integration</p>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-5">
              <div className="max-h-20 max-w-20 self-baseline rounded-full bg-primary p-2">
                <Avatar className="h-full w-full">
                  <AvatarImage src={wallet?.logo} alt="wallet logo" />
                  <AvatarFallback>hh</AvatarFallback>
                </Avatar>
              </div>
              <p>{wallet.summary}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Note: {wallet.addlDetails}</p>
          </CardContent>
        </Card>
        <Card className="flex flex-1 flex-col p-5">
          <div className="mb-5 flex items-baseline justify-between">
            <p className="text-lg font-semibold text-primary">{t('walletDetails.table_title')}</p>
            <Button variant="primary" onClick={onAddNewWalletModalToggle}>
              {t('walletDetails.add_new')}
            </Button>
          </div>
          <WalletsTable />
        </Card>
      </div>
      <AddNewWalletModal
        open={isAddNewWalletModalOpen}
        toggle={onAddNewWalletModalToggle}
        onSubmit={onAddNewWalletSubmit}
        isAddignNewWalletPending={isAddignNewWalletPending}
      />
      <ActionWalletSuccessModal
        description={t('wallets.add_wallet_modal_description')}
        open={addWalletSuccessModalOpen}
        toggle={onToggleAddWalletSuccessModel}
      />
    </>
  );
};

export default WalletDetailsPage;
