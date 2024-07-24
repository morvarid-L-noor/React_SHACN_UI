import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setSuccessModalState } from '@/app/store/modalSlice';
import { SuccessModalIcon } from '@/assets/svg';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog';

const SuccessModal = () => {
  const { open } = useAppSelector((state) => state.modals.successModal);
  const dispatch = useAppDispatch();

  const onCloseModal = () => {
    dispatch(setSuccessModalState({ open: false }));
  };

  return (
    <Dialog open={open} onOpenChange={onCloseModal}>
      <DialogContent className="flex flex-col items-center gap-10 bg-baseColor">
        <DialogHeader>
          <SuccessModalIcon height={120} />
        </DialogHeader>
        <p className="w-2/3 text-wrap text-center text-2xl font-medium text-primary">
          Your Password is successfully updated
        </p>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onCloseModal}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
