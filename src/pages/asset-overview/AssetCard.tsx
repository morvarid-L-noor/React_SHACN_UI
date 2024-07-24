import type { IUserAssetContracts } from '@/@types/userAssetContracts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate, formatNumber } from '@/lib/utils';
import { privatePaths } from '@/routes/client-paths';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ErrorIcon, RocketIcon, SuccessIcon } from '@/assets/svg';
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  asset: IUserAssetContracts;
}

const AssetCard: FC<Props> = ({ asset, ...props }) => {
  const { t } = useTranslation();
  return (
    <Card {...props}>
      <div
        style={{ backgroundImage: `url(${asset?.assetCampaignId?.images?.[0]})` }}
        className={`relative h-32 w-full bg-[url(${asset?.assetCampaignId?.images?.[0]})] rounded-tl-md rounded-tr-md bg-cover bg-center bg-no-repeat`}
      >
        {asset.isPublic ? (
          <Link
            to={`${privatePaths.assetDetails}/${asset._id}`}
            className="absolute left-2 top-2 flex items-center gap-2 rounded-full border-2 border-white py-1 pl-1 pr-3 text-white shadow-md transition-colors duration-300 hover:bg-primary-hover"
          >
            <RocketIcon className="h-6 w-6" />
            {t('asset_overview.asset_card.open_button')}
          </Link>
        ) : (
          <></>
        )}
      </div>
      <CardContent className="mb-5 flex items-center justify-between gap-2 rounded-bl-md rounded-br-md pt-5 shadow-md">
        <div className="flex gap-3">
          <img className="h-12 w-12 rounded-full" src={asset.iconPath} alt="icon" />
          <div>
            <p>{asset.name}</p>
            <p>{asset.blockchainId.name}</p>
          </div>
        </div>
        <p>{formatDate(asset.createdAt)}</p>
      </CardContent>
      <CardContent className="flex flex-1 flex-col gap-2 rounded-bl-md rounded-br-md">
        <div className="flex items-end">
          <p className="text-ellipsis-2 inline text-xs text-subtitle">{asset.description}</p>
          <Link
            to={`${privatePaths.assetDetails}/${asset._id}`}
            className="ml-1 cursor-pointer text-xs font-medium text-primary"
          >
            {t('asset_overview.asset_card.read_more')}
          </Link>
        </div>
        <div className="mt-auto space-y-2">
          <div className="flex justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="w-20 min-w-max">{t('asset_overview.asset_card.public_page')}</p>
              {asset?.isPublic ? <SuccessIcon className="h-6 w-6" /> : <ErrorIcon className="h-6 w-6" />}
            </div>
            <p>{formatNumber(2_500_000)}</p>
          </div>
          <div className="flex justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="w-20 min-w-max">{t('asset_overview.asset_card.kyc_verification')}</p>
              {asset?.kycTemplateAvailable ? <SuccessIcon className="h-6 w-6" /> : <ErrorIcon className="h-6 w-6" />}
            </div>
            <Badge className="bg-gradient-to-r from-primary-light to-primary">{t('asset_details.available')}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;
