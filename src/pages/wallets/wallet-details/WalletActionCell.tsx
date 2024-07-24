import DeleteWalletModal from '@/components/modals/DeleteWalletModal';
import { deleteWallet } from '@/services/dataServices/wallet';
import { apiRoutes } from '@/routes/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/store/hooks';
import { setConnectedWalletAddress } from '@/app/store/userSlice';
import ActionWalletSuccessModal from '@/components/modals/ActionWalletSuccessModal';
import { useTranslation } from 'react-i18next';

const ActionCell = ({ id }: { id: string }) => {
  const { t } = useTranslation();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteWalletSuccessModalOpen, setDeleteWalletSuccessModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { id: pathId } = useParams();
  const dispatch = useAppDispatch();

  const onDeleteWallet = () => {
    onToggleDelete();
  };

  const onToggleDeleteWalletSuccessModel = () => {
    setDeleteWalletSuccessModalOpen((s) => !s);
    queryClient.invalidateQueries({ queryKey: [apiRoutes.wallet.getWalletAddressById(pathId as string)] });
  };

  const { mutate: deleteWalletConfirmed } = useMutation({
    mutationFn: () => deleteWallet(id),
    onSuccess: (data) => {
      if (data?.success) {
        dispatch(setConnectedWalletAddress(''));
        setDeleteWalletSuccessModalOpen(true);
      }
    }
  });

  const onToggleDelete = (deleteConfirmed?: boolean) => {
    if (deleteConfirmed) {
      deleteWalletConfirmed();
    }
    setDeleteModalOpen((s) => !s);
  };

  return (
    <>
      <button className="text-primary" onClick={onDeleteWallet}>
        <Trash />
      </button>
      <DeleteWalletModal open={deleteModalOpen} toggle={onToggleDelete} />
      <ActionWalletSuccessModal
        description={t('wallets.delete_wallet_modal_description')}
        open={deleteWalletSuccessModalOpen}
        toggle={onToggleDeleteWalletSuccessModel}
      />
    </>
  );
};

export default ActionCell;
