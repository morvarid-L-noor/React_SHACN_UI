import CopyButton from '@/components/copy-button';
import Spinner from '@/components/loadings/spinner';
import PageHeader from '@/components/page_header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatNumber } from '@/lib/utils';
import { privatePaths } from '@/routes/client-paths';
import { useGetAssetContractByIdQuery } from '@/services/dataServices/asset';
import { getTotalTokenSupply } from '@/services/ledgerServices';
import { useMutation } from '@tanstack/react-query';
import { ChevronLeftIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const AssetDetailsPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const navigate = useNavigate();
  const { data: asset, isSuccess } = useGetAssetContractByIdQuery(id as string);
  const { mutate: getTokenSupply, isSuccess: tokenSupplySuccess } = useMutation({
    mutationFn: () =>
      getTotalTokenSupply({
        chainId: asset?.blockchainId.chainId as number,
        tPlusContractAddress: asset?.contractAddress as string
      }),
    onSuccess: (data) => {
      setTotalSupply(data.TotalSupply);
    }
  });
  useEffect(() => {
    if (isSuccess) {
      getTokenSupply();
    }
  }, [isSuccess, getTokenSupply]);

  const availableTokens = useMemo(() => {
    if (!asset) return 0;
    return asset?.assetCampaignId?.publicSale?.max + asset?.assetCampaignId?.privateSale?.max - totalSupply;
  }, [asset, totalSupply]);

  if (!tokenSupplySuccess || !asset) {
    return <Spinner />;
  }
  return (
    <>
      <PageHeader
        description={t('asset_details.page_description')}
        customRoutes={`/${privatePaths.assetDetails}/asset-details`}
        extraNode={
          <Button
            variant="link"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ChevronLeftIcon />
            <span>{t('buttons.back')}</span>
          </Button>
        }
      />
      <Card className="mb-3">
        <CardContent className="flex flex-wrap justify-between gap-5 pt-5">
          <div className="flex flex-col items-center gap-5">
            <span className="text-primary">{t('asset_details.tokens')}</span>
            <span>{formatNumber(asset?.stats.totalTokenAmount)}</span>
          </div>
          <div className="flex flex-col items-center gap-5">
            <span className="text-primary">{t('asset_details.investment')}</span>
            <span>{formatNumber(asset?.assetCampaignId?.minimumInvestment) ?? '-'}</span>
          </div>
          <div className="flex flex-col items-center gap-5">
            <span className="text-primary">{t('asset_details.investors')}</span>
            <span>{asset?.stats.uniqueInvestors}</span>
          </div>
          <div className="flex flex-col items-center gap-5">
            <span className="text-primary">{t('asset_details.kyc_applications')}</span>
            <span>No Data</span>
          </div>
          <div className="flex flex-col items-center gap-5">
            <span className="text-primary">{t('asset_details.transactions')}</span>
            <span>{formatNumber(asset?.stats.transactionCount)}</span>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-12 gap-2">
        <Card className="col-span-12 lg:col-span-6">
          <CardHeader>
            <div className="flex items-center justify-between gap-5">
              <img src={asset?.iconPath} alt="logo" className="h-12 w-12 rounded-full" />
              <div className="flex flex-col items-center">
                <span className="text-center">{t('asset_details.amount_in_circulation')}</span>
                <span className="text-lg font-medium text-primary">{totalSupply}</span>
              </div>
              <div className="rounded-md shadow-md">
                <span className="rounded-md bg-primary px-3 py-1 text-sm text-primary-foreground">
                  {t('asset_details.available')}
                </span>
                <p className="p-1 text-center">{availableTokens ? formatNumber(availableTokens) : '-'}</p>
              </div>
            </div>
          </CardHeader>
          <Separator className="mb-5" />
          <CardContent>
            <div className="grid grid-cols-12 gap-2 text-nowrap">
              <div className="col-span-12 flex flex-col gap-2 sm:col-span-6">
                <span className="text-xs font-medium text-primary">{t('asset_details.asset_name')}</span>
                <span>{asset?.name}</span>
              </div>
              <div className="col-span-12 flex flex-col gap-2 sm:col-span-6">
                <span className="text-xs font-medium text-primary">{t('asset_details.ticker')}</span>
                <span>{asset?.ticker}</span>
              </div>
              <div className="col-span-12 flex flex-col gap-2 sm:col-span-6">
                <span className="text-xs font-medium text-primary">{t('asset_details.asset_class')}</span>
                <span>{asset?.assetClass}</span>
              </div>
              <div className="col-span-12 flex flex-col gap-2 sm:col-span-6">
                <span className="text-xs font-medium text-primary">{t('asset_details.issuer')}</span>
                <span>
                  {asset?.userId.firstName} {asset?.userId.lastName}
                </span>
              </div>
              <div className="col-span-12 flex flex-col gap-2 sm:col-span-6">
                <span className="text-xs font-medium text-primary">{t('asset_details.token_symbol')}</span>
                <span>{asset?.ticker}</span>
              </div>
              <div className="col-span-12 flex flex-col gap-2 sm:col-span-6">
                <span className="text-xs font-medium text-primary">{t('asset_details.decimal')}</span>
                <span>{asset?.decimalPlaces}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-12 lg:col-span-6">
          <CardHeader>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between">
                <span>{t('asset_details.issuance_date')}:</span>
                <span>{formatDate(asset?.createdAt, 'MM-DD-YYYY hh:mm a')}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('asset_details.deployment_transaction')}:</span>
                <div className="flex items-center">
                  <span className="w-32 overflow-hidden text-ellipsis">{asset?.deploymentTransactionHash}</span>
                  <CopyButton value={asset?.deploymentTransactionHash} />
                </div>
              </div>
              <div className="flex justify-between rounded-sm border p-3">
                <span>{t('asset_details.contract_address')}:</span>
                <div className="flex items-center gap-1">
                  <span className="w-32 overflow-hidden text-ellipsis">{asset?.contractAddress}</span>
                  <CopyButton value={asset?.contractAddress} />
                </div>
              </div>
              <p className="text-subtitle">{t('asset_details.asset_note')}</p>
            </div>
          </CardHeader>
          <Separator className="mb-5" />
          <CardContent>
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap justify-between">
                <span className="flex-1">{t('asset_details.public_page_label')}</span>
                <div className="flex-1 text-center">
                  {asset.assetCampaignId ? (
                    <Badge variant="success">{t('asset_details.completed')}</Badge>
                  ) : (
                    <Badge variant="destructive">{t('asset_details.pending')}</Badge>
                  )}
                </div>
                <div className="flex-1 text-right">
                  <Button size="sm" variant="secondary" className="px-4" disabled>
                    {t('buttons.edit')}
                  </Button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="flex-1">{t('asset_details.kyc_template')}</span>
                <div className="flex-1 text-center">
                  <Badge variant="destructive">No Data</Badge>
                </div>
                <div className="flex-1 text-right">
                  <Button size="sm" variant="secondary" className="px-4" disabled>
                    {t('buttons.edit')}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AssetDetailsPage;
