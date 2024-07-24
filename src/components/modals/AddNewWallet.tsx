import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import type { TAddNewWalletForm } from '@/lib/schemas/wallet';
import { AddNewWalletFormSchema } from '@/lib/schemas/wallet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

type Props = {
  open: boolean;
  toggle: () => void;
  onSubmit: (formValues: TAddNewWalletForm) => void;
  isAddignNewWalletPending: boolean;
};

const AddNewWalletModal = ({ open, toggle, onSubmit, isAddignNewWalletPending }: Props) => {
  const { t } = useTranslation();
  // React Hook Form
  const form = useForm<TAddNewWalletForm>({
    resolver: zodResolver(AddNewWalletFormSchema),
    defaultValues: {
      walletAddress: ''
    }
  });

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="bg-baseColor">
        <DialogHeader>
          <DialogTitle className="text-3xl"> {t('newWalletModal.page_title')} </DialogTitle>
          <p>{t('newWalletModal.field_title')}</p>
          <DialogDescription>{t('newWalletModal.field_description')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="walletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter a wallet address"
                      className="bg-baseColor placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <div className="mt-4 flex w-full justify-start gap-2">
                <Button loading={isAddignNewWalletPending} type="submit" variant="primary" className="min-w-32">
                  {t('buttons.save')}
                </Button>
                <Button variant="secondary" type="button" onClick={toggle}>
                  {t('buttons.cancel')}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewWalletModal;
