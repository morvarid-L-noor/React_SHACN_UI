import type { ThirdPartyIntegration } from '@/@types/thirdPartyIntegrations';
import { useAppSelector } from '@/app/store/hooks';
import CopyButton from '@/components/copy-button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { privatePaths } from '@/routes/client-paths';
import { Link } from 'react-router-dom';

type Props = {
  integration: ThirdPartyIntegration;
};

const WalletCard = ({ integration }: Props) => {
  const connectedWalletAdress = useAppSelector((state) => state.user.connectedWalletAdress);

  return (
    <Card className={cn('self-stretch px-8 py-4', connectedWalletAdress ? 'bg-primary text-inherit' : 'bg-baseColor')}>
      <div className={cn('flex gap-12', { 'text-white': connectedWalletAdress })}>
        <img src={integration.blockchainId.icon} alt="Blockchain Icon" className="h-16 w-16" />
        <div className="w-full space-y-3">
          <div className="flex justify-between">
            <div>
              <span className="text-sm">Chain</span>
              <p className="text-lg">{integration.blockchainId.name}</p>
            </div>
            <div>
              <span className="text-sm">Wallet Type</span>
              <div className="flex items-center gap-2">
                <span className="text-lg">{integration.name}</span>
                <span className="h-6 w-6 rounded-full bg-primary">
                  <img src={integration.logo} alt="Wallet Icon" className="h-full w-full" />
                </span>
              </div>
            </div>
          </div>
          <div>
            <span className="text-sm">Wallet Address</span>
            <div className="flex gap-2">
              <p className="w-52 max-w-full overflow-hidden text-ellipsis text-lg">
                {connectedWalletAdress || 'Not Connected'}
              </p>
              {connectedWalletAdress && <CopyButton className="text-white" value={connectedWalletAdress} />}
            </div>
          </div>
          <Link
            to={`${privatePaths.manageWallet}/${integration._id}`}
            className="inline-block rounded-full border-2 border-white bg-primary px-4 py-2 text-background hover:bg-primary-hover"
          >
            Manage
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default WalletCard;
