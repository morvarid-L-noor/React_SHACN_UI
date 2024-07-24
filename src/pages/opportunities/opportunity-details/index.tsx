import Spinner from '@/components/loadings/spinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatNumber } from '@/lib/utils';
import { useGetAssetCampaignById } from '@/services/dataServices/asset';
import { useParams } from 'react-router-dom';
import OpportunityDetailsCarousel from './Carousel';
import { ChevronDownIcon } from 'lucide-react';

const OpportunityDetailsPage = () => {
  const { id } = useParams();
  const { data: asset, isPending } = useGetAssetCampaignById(id as string);
  if (!asset || isPending) return <Spinner />;
  return (
    <div className="flex flex-col gap-5">
      <OpportunityDetailsCarousel items={asset?.images} />
      <div className="flex justify-end">
        <Button type="button" variant="primary" className="px-8">
          I&apos;m Interested
        </Button>
      </div>
      <Card className="overflow-hidden">
        <CardHeader className="mb-1 rounded-bl-md rounded-br-md shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div>
                <img className="h-20 w-20 rounded-full" src={asset.logo} alt="icon" />
              </div>
              <h4 className="font-semibold">{asset.assetId.ticker}</h4>
            </div>
            <div className="space-x-2">
              <Badge className="border-2 border-primary-light bg-transparent px-4 py-2 text-primary-light">
                RETAIL
              </Badge>
              <Badge className="border-2 border-primary-dark bg-transparent px-4 py-2 text-primary-dark">
                CORPORATE
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-card-primary-gradient pt-6">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-6">
              <h4 className="mb-3 text-primary">{asset.assetId.name}</h4>
              <p className="text-justify text-subtitle xl:pr-5">{asset.description}</p>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <div className="flex w-full flex-wrap items-baseline justify-between gap-2">
                <div className="flex flex-col items-center gap-5">
                  <p className="text-sm text-primary">Profit share</p>
                  <p className="text-2xl font-medium">{asset.profitShare}%</p>
                </div>
                <div className="flex flex-col items-center gap-5">
                  <p className="text-sm text-primary">Investors</p>
                  <p className="text-2xl font-medium">{formatNumber(asset.investors)}</p>
                </div>
                <div className="flex flex-col items-center gap-5">
                  <p className="text-2xl font-medium text-primary">Open</p>
                  {/* TODO: verify this value */}
                  <p className="text-2xl font-medium">{asset.totalTokenAmount}</p>
                </div>
              </div>
              <Separator className="my-5" />
              <div className="flex">
                <div className="flex flex-col items-center gap-5">
                  <p className="text-sm text-primary">Amount Raised</p>
                  <p className="text-2xl font-medium">{formatNumber(asset.investors)}</p>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-5" />
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-6">
              <h4 className="mb-6 text-primary">Additional Information</h4>
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-6 flex flex-col gap-2">
                  <p className="text-sm text-primary">Industry</p>
                  <p className="font-medium">{asset.industry.name}</p>
                </div>
                <div className="col-span-6 flex flex-col gap-2">
                  <p className="text-sm text-primary">Maturity</p>
                  <p className="font-medium">No Data</p>
                </div>
                <div className="col-span-6 flex flex-col gap-2">
                  <p className="text-sm text-primary">Minimum Investment</p>
                  <p className="font-medium">$ {formatNumber(asset.minimumInvestment)}</p>
                </div>
                <div className="col-span-6 flex flex-col gap-2">
                  <p className="text-sm text-primary">Website</p>
                  <p className="font-medium">{asset.website}</p>
                </div>
                <div className="col-span-6 flex flex-col gap-2">
                  <p className="text-sm text-primary">Currencies</p>
                  <div className="flex flex-wrap gap-1 font-medium">
                    {asset.currenciesAccepted.map((currency) => (
                      <>
                        <span key={currency._id}>{currency.name}</span>
                        <span className="last-of-type:hidden">,</span>
                      </>
                    ))}
                  </div>
                </div>
                <div className="col-span-6 flex flex-col gap-2">
                  <p className="text-sm text-primary">Blockchain</p>
                  <p className="font-medium">{asset.assetId.blockchainId.name}</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 flex flex-col gap-3 lg:col-span-6">
              <h4 className="text-primary">Documents</h4>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-primary">Company stage</p>
                  <p className="text-lg font-medium">{asset.companyStage.name}</p>
                </div>
                <ChevronDownIcon className="text-primary" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-primary">Industry</p>
                  <p className="text-lg font-medium">{asset.industry.name}</p>
                </div>
                <ChevronDownIcon className="text-primary" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-primary">Geographic market</p>
                  <p className="text-lg font-medium">{formatNumber(asset.geographicMarket.name)}</p>
                </div>
                <ChevronDownIcon className="text-primary" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-primary">Competitors</p>
                  <p className="text-lg font-medium">{formatNumber(asset.competitors.name)}</p>
                </div>
                <ChevronDownIcon className="text-primary" />
              </div>
              <Separator />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpportunityDetailsPage;
