import type { IAssetCampaign } from '@/@types/userAssetCampaign';
import { HeartIcon } from '@/assets/svg';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn, formatDate, formatNumber } from '@/lib/utils';
import { privatePaths } from '@/routes/client-paths';
import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  asset: IAssetCampaign;
  addToFavorites: (assetId: string) => void;
}

const OpportunityCard: FC<Props> = ({ asset, addToFavorites, ...props }) => {
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(asset.isFavorite);
  const onFavoriteClick = (id: string) => {
    addToFavorites(id);
    setIsFavorite(!isFavorite);
  };
  return (
    <Card {...props}>
      <CardHeader
        style={{ backgroundImage: `url(${asset?.images?.[0]})` }}
        className={`h-32 w-full rounded-tl-md rounded-tr-md bg-cover bg-center bg-no-repeat`}
      >
        <div className="flex items-center justify-between">
          <Link
            to={`${privatePaths.assetDetails}/${asset._id}`}
            className="rounded-full border-2 border-white px-4 py-1 text-white shadow-md transition-colors duration-300 hover:bg-primary-hover"
          >
            {t('opportunities.opportunity_card.apply_button')}
          </Link>
          <button
            onClick={() => {
              onFavoriteClick(asset.assetId._id);
            }}
          >
            <HeartIcon
              className={cn('text-transparent', {
                'text-destructive': isFavorite
              })}
            />
          </button>
        </div>
      </CardHeader>
      <CardContent className="mb-5 flex items-center justify-between gap-2 rounded-bl-md rounded-br-md pt-5 shadow-md">
        <div className="flex gap-3">
          <img className="h-12 w-12 rounded-full" src={asset.logo} alt="icon" />
          <div>
            <p className="text-lg font-medium">{asset.assetId.ticker}</p>
            <p className="text-sm">{asset.assetId.blockchainId.name}</p>
          </div>
        </div>
        <div>
          <p>{formatNumber(asset.publicSale.max)}</p>
          <p className="text-sm text-subtitle">no Data</p>
        </div>
      </CardContent>
      <CardContent className="flex flex-1 flex-col gap-2 rounded-bl-md rounded-br-md">
        <div className="flex items-baseline justify-between gap-5">
          <div>
            <p className="text-lg font-medium">{asset.assetId.name}</p>
            <p className="mb-1 text-sm text-subtitle">Min.Invest. : {formatNumber(asset.minimumInvestment)}</p>
            <div className="flex gap-2">
              {asset.tags?.map((tag) => {
                if (!tag?.name) return null;
                return (
                  <Badge
                    key={tag.name}
                    className={cn('border bg-transparent', {
                      'border-primary-dark text-primary-dark': tag.name === 'CORPORATE',
                      'border-primary-light text-primary-light': tag.name === 'RETAIL'
                    })}
                  >
                    {tag.name}
                  </Badge>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-subtitle">Upcoming</p>
            <p className="text-xs text-subtitle">{formatDate(asset.createdAt, 'MM/DD/YYYY')}</p>
            <p className="text-xs text-subtitle">{formatDate(asset.createdAt, 'HH:mm')}</p>
          </div>
        </div>
        <div className="mt-auto space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-32 text-wrap text-sm">Avalanche, Ethereum, Tron, Polygon</p>
            <Link
              to={`${privatePaths.opportunity_details}/${asset._id}`}
              className="text-nowrap rounded-full bg-primary/20 px-3 py-1 text-primary"
            >
              Full details
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;
