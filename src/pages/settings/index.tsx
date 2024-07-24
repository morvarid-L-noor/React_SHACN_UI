import { ManageWalletIcon, ProfileIcon } from '@/assets/svg';
import PageHeader from '@/components/page_header';
import { privatePaths } from '@/routes/client-paths';
import { useSDK } from '@metamask/sdk-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import SettingCard from './SettingCard';

const SettingsPage = () => {
  const { t } = useTranslation();
  const settingsItems = [
    {
      title: t('settings.profile'),
      icon: <ProfileIcon />,
      subTitle: 'Manage your basic account information here',
      link: privatePaths.profile
    },
    {
      title: 'Manage Wallets',
      icon: <ManageWalletIcon />,
      subTitle: 'Update your password and security settings',
      link: privatePaths.manageWallet
    }
  ];
  const { connected } = useSDK();
  useEffect(() => {
    if (!connected) {
      toast.warning('Please Connect Your MetaMask Wallet');
    }
  }, []);

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Settings"
        description="Adjust preferences, review your KYC data and status, manage security settings, MultiSig Contracts and Wallet Connections"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {settingsItems.map((item) => (
          <Link to={item.link} key={item.title} className="self-stretch">
            <SettingCard title={item.title} subTitle={item.subTitle} icon={item.icon} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
