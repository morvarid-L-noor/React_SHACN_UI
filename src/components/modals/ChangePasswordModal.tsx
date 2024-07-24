import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import type { TChangePasswordRequestParameters } from '@/lib/schemas/auth';
import { ChangePasswordFormSchema } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

import { changePassword } from '@/services/dataServices/auth';

type Props = {
  open: boolean;
  toggle: () => void;
};

const ChangePasswordModal = ({ open, toggle }: Props) => {
  const [showOldPass, setShowOldPass] = useState<boolean>(false);
  const [showNewPass, setShowNewPass] = useState<boolean>(false);
  const [showConfirmNewPass, setShowConfirmNewPass] = useState<boolean>(false);

  const onShowOldPassClick = () => {
    setShowOldPass((s) => !s);
  };
  const onShowNewPassClick = () => {
    setShowNewPass((s) => !s);
  };
  const onShowConfirmNewPassClick = () => {
    setShowConfirmNewPass((s) => !s);
  };
  // React Hook Form
  const form = useForm<TChangePasswordRequestParameters>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });
  // React Query
  const { mutate: changePass, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success('Password changed successfully.');
        toggle();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  const onFormSubmit = (formValues: TChangePasswordRequestParameters) => {
    changePass(formValues);
  };

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="bg-baseColor">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Choose a new password. Your password must include at least 8 characters, one lowercase, and one number.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      type={showOldPass ? 'text' : 'password'}
                      placeholder="Enter old password"
                      className="bg-white placeholder:text-gray-400 dark:bg-black"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={onShowOldPassClick}
                    className="absolute -top-2 right-2 translate-y-1/2 cursor-pointer text-gray-500 "
                  >
                    {showOldPass ? <EyeIcon size={24} /> : <EyeOff size={24} />}
                  </button>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      type={showNewPass ? 'text' : 'password'}
                      placeholder="Enter new password"
                      className="bg-white placeholder:text-gray-400 dark:bg-black"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={onShowNewPassClick}
                    className="absolute -top-2 right-2 translate-y-1/2 cursor-pointer text-gray-500 "
                  >
                    {showNewPass ? <EyeIcon size={24} /> : <EyeOff size={24} />}
                  </button>
                  <FormMessage className="flex flex-wrap text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      type={showConfirmNewPass ? 'text' : 'password'}
                      placeholder="Confirm new password"
                      className="bg-white placeholder:text-gray-400 dark:bg-black"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={onShowConfirmNewPassClick}
                    className="absolute -top-2 right-2 translate-y-1/2 cursor-pointer text-gray-500 "
                  >
                    {showConfirmNewPass ? <EyeIcon size={24} /> : <EyeOff size={24} />}
                  </button>
                  <FormMessage className="flex flex-wrap text-xs" />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-6">
              <Button loading={isPending} type="submit" variant="primary">
                Update Password
              </Button>
              <Button variant="secondary" type="button" onClick={toggle}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
