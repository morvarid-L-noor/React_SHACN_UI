import Filter from '@/components/filter/Filter';
import Spinner from '@/components/loadings/spinner';
import PageHeader from '@/components/page_header';
import { Button } from '@/components/ui/button';
import { useGetOrganizationAssetContractsQuery } from '@/services/dataServices/asset';
import { RefreshCcwIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AssetCard from './AssetCard';
const AssetOverviewPage = () => {
  const { t } = useTranslation();
  const { data, isPending, refetch } = useGetOrganizationAssetContractsQuery();
  const onRefreshButtonClick = () => {
    refetch();
  };
  return (
    <>
      <PageHeader
        title={t('asset_overview.page_title')}
        description={t('asset_overview.page_description')}
        extraNode={
          <Button variant="link" className="space-x-2" onClick={onRefreshButtonClick}>
            <span>{t('buttons.refresh')}</span>
            <RefreshCcwIcon />
          </Button>
        }
      />
      <Filter handleSearch={() => {}} />
      {isPending || !data ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-12 gap-5">
          {data?.docs?.map((asset) => (
            <AssetCard
              key={asset._id}
              asset={asset}
              className="col-span-12 flex flex-col self-stretch bg-baseColor lg:col-span-6 xl:col-span-4"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AssetOverviewPage;
