import { Dialog, DialogContent } from '@/components/ui/dialog';

import { Button } from '../ui/button';
import { SuccessIcon } from '@/assets/svg';

type Props = {
  description: string;
  open: boolean;
  toggle: () => void;
};

const ActionWalletSuccessModal = ({ description, open, toggle }: Props) => {
  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="bg-baseColor px-12 py-14 text-center">
        <SuccessIcon className="mx-auto mb-3 h-32 w-32" />
        <p className="mb-6 text-3xl text-primary">{description}</p>
        <Button type="submit" variant="secondary" className="mx-auto text-lg" onClick={toggle}>
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ActionWalletSuccessModal;
