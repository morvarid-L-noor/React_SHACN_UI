import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import type { TForgotPasswordRequestParameters } from '@/lib/schemas/auth';
import { ForgotPasswordFormSchema } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { forgot } from '@/services/dataServices/auth';

type Props = {
  open: boolean;
  toggle: () => void;
};

const ForgotPasswordModal = ({ open, toggle }: Props) => {
  const [isResetPasswordSent, setIsResetPasswordSent] = useState(false);
  const [email, setEmail] = useState('');

  // React Hook Form
  const form = useForm<TForgotPasswordRequestParameters>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: ''
    }
  });
  // React Query
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgot,
    onSuccess: (data) => {
      if (data?.success) {
        setIsResetPasswordSent(true);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  const onFormSubmit = (formValues: TForgotPasswordRequestParameters) => {
    setEmail(formValues.email);
    forgotPassword(formValues);
  };

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="bg-baseColor">
        <DialogHeader>
          <DialogTitle>{isResetPasswordSent ? 'Email Sent' : 'Forgotten your password?'}</DialogTitle>
          <DialogDescription>
            {isResetPasswordSent
              ? `We have sent a link to reset your password to ${email}. Please check your email box and proceed with the password reset process.`
              : 'Enter the email address you used when you joined and we’ll send you instructions to reset your password.'}
          </DialogDescription>
        </DialogHeader>
        {isResetPasswordSent ? (
          <Button type="submit" variant="primary" className="w-full" onClick={toggle}>
            Close
          </Button>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type={'email'}
                        placeholder="Email address"
                        className="bg-white placeholder:text-gray-400 dark:bg-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <Button loading={isPending} type="submit" variant="primary" className="w-full">
                  Send Email
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
