import type { UserIntegration } from '@/@types/thirdPartyIntegrations';
import { formatDate } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';
import { ArrowUpDown } from 'lucide-react';
import ActionCell from './WalletActionCell';
import StatusCell from './WalletStatusCell';

export const walletsTablecolumns: Array<ColumnDef<UserIntegration>> = [
  {
    accessorKey: 'walletAddress',
    header: t('walletDetails.wallet_address'),
    cell: ({ row }) => <p className="w-36 max-w-full overflow-hidden text-ellipsis">{row.getValue('walletAddress')}</p>
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <button
          className="flex justify-start gap-2 text-left"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          {t('walletDetails.date_time')}
          <ArrowUpDown size={16} />
        </button>
      );
    },
    cell: ({ row }) => <p>{formatDate(row.getValue('createdAt'))}</p>
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => {
      return (
        <button
          className="flex justify-start gap-2 text-left"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          {t('walletDetails.status')}
          <ArrowUpDown size={16} />
        </button>
      );
    },
    cell: ({ row }) => (
      <StatusCell
        id={row.getValue('_id')}
        status={row.getValue('isActive')}
        walletAddress={row.getValue('walletAddress')}
      />
    )
  },
  {
    accessorKey: '_id',
    header: 'Action',
    cell: ({ row }) => <ActionCell id={row.getValue('_id')} />
  }
];
