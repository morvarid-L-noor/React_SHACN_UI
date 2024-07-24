import { Card } from '@/components/ui/card';
import { SummaryAcquiredIcon, SummaryRedeemIcon, SummaryTransactionIcon } from '@/assets/svg';
import { useTranslation } from 'react-i18next';

interface Props {
  summaryData: {
    totalCompletedRedeem?: number;
    totalPendingRedeem?: number;
    totalRedeemAmount?: number;
    totalCompletedAcquire?: number;
    totalPendingAcquire?: number;
    totalAcquireAmount?: number;
    totalCompleted?: number;
    totalPending?: number;
    totalCount?: number;
  };
}

const Summary = ({ summaryData }: Props) => {
  const { t } = useTranslation();
  const summary = [
    {
      id: 1,
      title: t('transactions.transaction_summary_total_redeem'),
      type: 'redeem',
      description: `${summaryData?.totalCompletedRedeem} completed, ${summaryData?.totalPendingRedeem} pending`,
      amount: `${summaryData?.totalRedeemAmount}`,
      token: 'USD₮',
      icon: <SummaryRedeemIcon />
    },
    {
      id: 2,
      title: t('transactions.transaction_summary_total_acquired'),
      type: 'redeem',
      description: `${summaryData?.totalCompletedAcquire} completed, ${summaryData?.totalPendingAcquire} pending`,
      amount: `${summaryData?.totalAcquireAmount}`,
      token: 'USD₮',
      icon: <SummaryAcquiredIcon /> // Assuming SummaryAcquiredIcon is defined somewhere
    },
    {
      id: 3,
      title: t('transactions.transaction_summary_total_transactions'),
      type: 'redeem',
      description: `${summaryData?.totalCompleted} completed, ${summaryData?.totalPending} pending`,
      amount: `${summaryData?.totalCount}`,
      token: '',
      icon: <SummaryTransactionIcon /> // Assuming SummaryTransactionsIcon is defined somewhere
    }
  ];

  return (
    <Card className="flex flex-1 flex-col p-5">
      <p className="text-2xl font-normal leading-9 text-primary">{t('transactions.transaction_summary_title')}</p>
      <div className="mt-5 grid grid-cols-12 gap-3">
        {summary.map((s) => {
          return (
            <div key={s.id} className="col-span-12 lg:col-span-6 xl:col-span-4">
              <Card className="flex flex-1 flex-col bg-muted p-5">
                <div className="flex items-center justify-between">
                  <p className="lending-5 font-normal">{s.title}</p>
                  <span className="text-primary">{s.icon}</span>
                </div>
                <div className="pt-0">
                  <div className="text-2xl font-medium">{`${s.amount} ${s.token}`}</div>
                  <p className="text-sm text-muted-foreground">({s.description})</p>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Summary;
