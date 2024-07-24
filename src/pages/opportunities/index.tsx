import Spinner from '@/components/loadings/spinner';
import { createFavoriteAssetRequest, useGetAllAssetCampaign } from '@/services/dataServices/asset';
import { useTranslation } from 'react-i18next';
import OpportunityCard from './OpportunityCard';
import { useMutation } from '@tanstack/react-query';
import OpportunitiesCarousel from './Carousel';

const OpportunitiesPage = () => {
  const { data, isPending } = useGetAllAssetCampaign({ limit: 6, page: 1 });
  const { mutate: addToFavorites } = useMutation({
    mutationFn: createFavoriteAssetRequest,
    onSuccess: (data) => {
      console.log(data);
    }
  });
  const { t } = useTranslation();
  return (
    <>
      <OpportunitiesCarousel />
      <p className="mb-4 text-2xl text-gray-800 dark:text-gray-300">{t('opportunities.page_title')}</p>
      {isPending || !data ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-12 gap-5">
          {data?.docs?.map((asset) => (
            <OpportunityCard
              key={asset._id}
              asset={asset}
              addToFavorites={addToFavorites}
              className="col-span-12 flex flex-col self-stretch bg-baseColor lg:col-span-6 xl:col-span-4"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default OpportunitiesPage;
