import { FailureModalIcon } from '@/assets/svg';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

type Props = {
  open: boolean;
  toggle: (variable?: boolean) => void;
};

const DeleteWalletModal = ({ open, toggle }: Props) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="bg-baseColor">
        <DialogHeader>
          <FailureModalIcon className="mx-auto" />
        </DialogHeader>
        <p className="text-center text-lg font-medium">{t('wallets.delete_wallet_message_warning')}</p>
        <DialogFooter className="pt-4">
          <div className="flex w-full justify-center gap-2">
            <Button
              onClick={() => {
                toggle(false);
              }}
              variant="secondary"
              className="w-36 bg-transparent"
            >
              {t('buttons.cancel')}
            </Button>
            <Button
              onClick={() => {
                toggle(true);
              }}
              variant="destructive"
              className="w-36 rounded-full"
            >
              {t('buttons.delete')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWalletModal;
