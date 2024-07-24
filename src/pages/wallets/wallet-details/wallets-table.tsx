import type { UserIntegrationsResponse } from '@/@types/thirdPartyIntegrations';
import Spinner from '@/components/loadings/spinner';
import { DataTable } from '@/components/table/data-table';
import { Card } from '@/components/ui/card';
import { apiRoutes } from '@/routes/api';
import { Axios } from '@/services/dataServices/axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { walletsTablecolumns } from './columns';

const WalletsTable = () => {
  const { id } = useParams();
  if (!id) {
    return <Spinner />;
  }
  const { data, isPending } = useQuery({
    queryKey: [apiRoutes.wallet.getWalletAddressById(id), id],
    queryFn: async ({ queryKey }) => {
      const result: UserIntegrationsResponse = await Axios.get(apiRoutes.wallet.getWalletAddressById(queryKey[1]));
      return result.response;
    }
  });
  if (isPending || !data) {
    return null;
  }
  return (
    <Card>
      <DataTable columns={walletsTablecolumns} data={data.wallets} loading={isPending} className="flex-1" />
      {/* <div className="flex items-center justify-end gap-3 pt-5">
    <p>{paginationText}</p>
    <button
      className="rounded-full bg-primary/20 p-2 text-primary transition-colors duration-200 disabled:bg-muted disabled:text-gray-500"
      disabled={!data?.hasPrevPage}
      onClick={() => handlePageChange(paginationOptions.page - 1)}
    >
      <ChevronLeft />
    </button>
    <button
      className="rounded-full bg-primary/20 p-2 text-primary transition-colors duration-200 disabled:bg-muted disabled:text-gray-500"
      disabled={!data?.hasNextPage}
      onClick={() => handlePageChange(paginationOptions.page + 1)}
    >
      <ChevronRight />
    </button>
  </div> */}
    </Card>
  );
};

export default WalletsTable;
