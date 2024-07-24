import Spinner from '@/components/loadings/spinner';
import PageHeader from '@/components/page_header';
import { Card, CardContent } from '@/components/ui/card';
import type { TPublicAssetInformationForm } from '@/lib/schemas/asset';
import { useGetAssetContractByIdQuery } from '@/services/dataServices/asset';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const AssetPublicPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<TPublicAssetInformationForm | null>(null);
  const { data: asset, isPending } = useGetAssetContractByIdQuery(id as string);
  useEffect(() => {
    if (!asset) return;
    console.log(formData);
    setFormData({
      images: asset.assetCampaignId.images,
      videos: asset.assetCampaignId,
      logo: asset.assetCampaignId,
      description: asset.assetCampaignId.description,
      website: asset.assetCampaignId.website,
      assetMaturity: asset.assetCampaignId.assetMaturity,
      industry: asset.assetCampaignId.industry,
      currenciesAccepted: asset.assetCampaignId.currenciesAccepted[0],
      minimumInvestment: asset.assetCampaignId.minimumInvestment.toString(),
      profitShare: asset.assetCampaignId.profitShare.toString(),
      publicSale: asset.assetCampaignId.publicSale.max.toString(),
      privateSale: asset.assetCampaignId.privateSale.max.toString(),
      companyStage: asset.assetCampaignId.companyStage,
      geographicMarket: asset.assetCampaignId.geographicMarket,
      competitors: asset.assetCampaignId.competitors
    });
  }, [asset]);
  if (isPending || !asset) {
    return <Spinner />;
  }
  return (
    <>
      <PageHeader description={t('asset_details.public_page.page_description')} />
      <Card>
        <CardContent>Public Page</CardContent>
      </Card>
    </>
  );
};

export default AssetPublicPage;
