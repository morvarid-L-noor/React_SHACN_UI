import { NoDataSVG } from '@/assets/svg';
import Filter from '@/components/filter/Filter';
import PageHeader from '@/components/page_header';
import { Button } from '@/components/ui/button';
import { RefreshCcwIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const KYCApplicationPage = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');

  const handleSearch = (value: string) => {
    setSearchText(value);
    console.log('search value =', searchText);
  };
  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title={t('kycApplication.page_title')}
        description={t('kycApplication.page_sub_title')}
        extraNode={
          <Button variant="link" className="space-x-2">
            <span>{t('buttons.refresh')}</span>
            <RefreshCcwIcon />
          </Button>
        }
      />
      <Filter handleSearch={handleSearch} />

      <div className="flex flex-col items-center justify-center gap-5">
        <NoDataSVG width={'30%'} />
        <p className="text-wrap text-center text-gray-400">{t('kycApplication.no_data')}</p>
      </div>
    </div>
  );
};

export default KYCApplicationPage;
