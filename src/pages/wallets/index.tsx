import PageHeader from '@/components/page_header';
import { useGetWalletProvidersQuery } from '@/services/dataServices/wallet';
import { useTranslation } from 'react-i18next';
import WalletCard from './WalletCard';

const ManageWalletsPage = () => {
  const { t } = useTranslation();
  const { data: integrations } = useGetWalletProvidersQuery();
  return (
    <>
      <PageHeader description={t('wallets.page_description')} />
      {integrations?.map((wallet) => (
        <div key={wallet._id}>
          <p className="mb-3 text-lg font-medium">{wallet._id}</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
            {wallet.integrations.map((integration) => (
              <WalletCard key={integration._id} integration={integration} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ManageWalletsPage;
