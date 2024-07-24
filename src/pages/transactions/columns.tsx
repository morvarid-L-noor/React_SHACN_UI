import type { AllTransactions } from '@/@types/transactions';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { t } from 'i18next';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';

const ActionCell = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const onActionClick = () => {
    console.log(id);
  };
  return (
    <div className="flex gap-4">
      <Button variant="secondary" onClick={onActionClick}>
        {t('buttons.review')}
      </Button>
    </div>
  );
};

const renderStatus = (status: string) => {
  let badgeVariant: 'destructive' | 'success' | 'info';

  switch (status) {
    case 'Pending':
    case 'Pending Signers':
    case 'Rejected': {
      badgeVariant = 'destructive';
      break;
    }
    case 'Completed': {
      badgeVariant = 'success';
      break;
    }
    default: {
      badgeVariant = 'success';
      break;
    }
  }

  return (
    <Badge variant={badgeVariant} className="text-nowrap">
      {status}
    </Badge>
  );
};

export const columns: Array<ColumnDef<AllTransactions>> = [
  {
    id: 'name',
    accessorFn: (row) => row.userId?.firstName + ' ' + row.userId?.lastName,
    cell: ({ row }) => <span className="text-nowrap">{row.getValue('name')}</span>,
    header: ({ column }) => {
      return (
        <button
          className="flex justify-start gap-2 text-left"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          {t('transactions.transaction_table_col_name')}
          <ArrowUpDown size={16} />
        </button>
      );
    }
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
          {t('transactions.transaction_table_col_date_time')}
          <ArrowUpDown size={16} />
        </button>
      );
    },
    cell: ({ row }) => (
      <span className="text-nowrap text-subtitle">{dayjs(row.getValue('createdAt')).format('YYYY-MM-DD h:mm:ss')}</span>
    )
  },
  {
    id: 'asset',
    accessorFn: (row) => row.UserAssetContract?.name,
    cell: ({ row }) => <img src={row.original?.UserAssetContract?.iconPath} alt="asset" height="40" width="40" />,
    header: ({ column }) => {
      return (
        <button
          className="flex justify-start gap-2 text-left"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          {t('transactions.transaction_table_col_asset')}
          <ArrowUpDown size={16} />
        </button>
      );
    }
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <button
          className="flex justify-start gap-2 text-left"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          {t('transactions.transaction_table_col_type')}
          <ArrowUpDown size={16} />
        </button>
      );
    }
  },
  {
    id: 'status',
    accessorFn: (row) => row.statusId?.label,
    cell: ({ row }) => {
      return renderStatus(row.getValue('status'));
    },
    header: ({ column }) => {
      return (
        <button
          className="flex justify-start gap-2 text-left"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          {t('transactions.transaction_table_col_status')}
          <ArrowUpDown size={16} />
        </button>
      );
    }
  },
  {
    accessorKey: 'totalTokenAmount',
    header: ({ column }) => {
      return (
        <button
          className="flex justify-start gap-2 text-left"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          {t('transactions.transaction_table_col_tokens')}
          <ArrowUpDown size={16} />
        </button>
      );
    },
    cell: ({ row }) => row.getValue('totalTokenAmount')
  },
  {
    accessorKey: '_id',
    header: '',
    cell: ({ row }) => <ActionCell id={row.getValue('_id')} />
  }
];
