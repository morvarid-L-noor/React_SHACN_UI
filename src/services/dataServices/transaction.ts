import type { AllTransactionsResponse } from '@/@types/transactions';
import { apiRoutes } from '@/routes/api';
import { useQuery } from '@tanstack/react-query';
import { Axios } from './axios';

type TransactionParameters = {
  limit: number;
  page: number;
  search: string;
};

const getAllTransactions = async ({ limit, page, search }: TransactionParameters) => {
  const result: AllTransactionsResponse = await Axios.get(apiRoutes.transaction.GETALL({ limit, page, search }));
  return result.response;
};

export const useGetAllTransaction = ({ limit = 5, page = 1, search = '' }: TransactionParameters) =>
  useQuery({
    queryKey: [apiRoutes.transaction.GETALL({ limit, page, search }), page, limit, search],
    queryFn: () => getAllTransactions({ limit, page, search })
  });
