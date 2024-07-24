import { Dialog, DialogContent } from '@/components/ui/dialog';

import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { publicPaths } from '@/routes/client-paths';
import { BorderSignupModalIcon, InfoIcon, SuccessIcon } from '@/assets/svg';

type Props = {
  open: boolean;
  toggle: () => void;
};

const SignupSuccessMessageModal = ({ open, toggle }: Props) => {
  const navigate = useNavigate();
  const onModalClose = () => {
    toggle();
    navigate(publicPaths.verifyOTP);
  };
  return (
    <Dialog open={open} onOpenChange={onModalClose}>
      <DialogContent className="justify-center bg-baseColor text-center">
        <SuccessIcon className="w-full" />
        <p className="text-3xl font-bold text-primary">Investor Account Successfully Created</p>
        <p className="mb-1 text-2xl text-primary">We have sent you an email to finish your registration process.</p>
        <div className="relative mb-8">
          <BorderSignupModalIcon className="ml-2" />
          <InfoIcon className="absolute -bottom-8 right-8" />
          <p className="absolute top-0 p-8 text-xl">
            The next time you log into the platform, you will be directed to the KYC verification process. You can skip
            it but many features will be unavailable until your account is verified.
          </p>
        </div>
        <div className="w-full justify-center">
          <Button type="submit" variant="primary" onClick={onModalClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupSuccessMessageModal;
