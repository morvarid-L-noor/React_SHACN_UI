import Filter from '@/components/filter/Filter';
import Spinner from '@/components/loadings/spinner';
import PageHeader from '@/components/page_header';
import { DataTable } from '@/components/table/data-table';
import { Card } from '@/components/ui/card';
import { useGetAllTransaction } from '@/services/dataServices/transaction';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Summary from './Summary';
import { columns } from './columns';

const TransactionPage = () => {
  const { t } = useTranslation();
  const [paginationOptions, setPaginationOptions] = useState({ limit: 4, page: 1, search: '' });
  const { data, isLoading, isPending } = useGetAllTransaction(paginationOptions);
  const handlePageChange = (page: number) => {
    setPaginationOptions((previous) => ({ ...previous, page }));
  };

  const handleSearch = (value: string) => {
    setPaginationOptions((previous) => ({ ...previous, search: value }));
  };

  const paginationText = useMemo(
    () =>
      data?.transactions?.docs?.length
        ? `${(data.transactions.page - 1) * data.transactions.limit + 1} - ${data.transactions.page * data.transactions.limit} of ${data.transactions.totalDocs}`
        : '',
    [data]
  );

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader title={t('transactions.page_title')} description={t('transactions.page_description')} />
      <Filter handleSearch={handleSearch} />
      {isPending || !data ? (
        <Spinner />
      ) : (
        <>
          <Summary summaryData={data?.summary} />
          <Card className="mt-5 flex flex-1 flex-col p-5">
            <div className="mb-5 flex items-baseline justify-between">
              <p className="text-lg font-semibold text-primary">{t('transactions.transaction_table_title')}</p>
            </div>
            <DataTable columns={columns} data={data?.transactions?.docs ?? []} loading={isLoading} className="flex-1" />
            <div className="flex items-center justify-end gap-3 pt-5">
              <p>{paginationText}</p>
              <button
                className="rounded-full bg-primary/20 p-2 text-primary transition-colors duration-200 disabled:bg-muted disabled:text-gray-500"
                disabled={!data?.transactions?.hasPrevPage}
                onClick={() => {
                  handlePageChange(paginationOptions.page - 1);
                }}
              >
                <ChevronLeft />
              </button>
              <button
                className="rounded-full bg-primary/20 p-2 text-primary transition-colors duration-200 disabled:bg-muted disabled:text-gray-500"
                disabled={!data?.transactions?.hasNextPage}
                onClick={() => {
                  handlePageChange(paginationOptions.page + 1);
                }}
              >
                <ChevronRight />
              </button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default TransactionPage;
