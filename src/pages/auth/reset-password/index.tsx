// import { LogoSVG } from '@/assets/svg';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { TResetPasswordRequestParameters } from '@/lib/schemas/auth';
import { ResetPasswordFormSchema } from '@/lib/schemas/auth';
import { resetPassword } from '@/services/dataServices/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const ResetPasswordPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const onShowPasswordClick = () => {
    setShowPassword((s) => !s);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const onShowConfirmPasswordClick = () => {
    setShowConfirmPassword((s) => !s);
  };

  // React Hook Form
  const form = useForm<TResetPasswordRequestParameters>({
    resolver: zodResolver(ResetPasswordFormSchema)
  });
  const { mutate: resetPass, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success('Password Changed Successfully');
        setTimeout(() => {
          navigate('/sign-in');
        }, 500);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const onFormSubmit = (formValues: TResetPasswordRequestParameters) => {
    resetPass(formValues);
  };

  useEffect(() => {
    if (id) {
      form.setValue('resetToken', id);
    }
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center lg:p-10">
      <Card className="w-full max-w-lg space-y-5 border-none px-5 pb-12 pt-5 shadow-3xl md:px-10">
        {/* <LogoSVG width={150} /> */}
        <h4>Reset Password</h4>
        {/* <p className="text-gray-400">You can now set a new password for your account.</p> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className=" space-y-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative pb-6">
                  <FormControl>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="bg-transparent placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={onShowPasswordClick}
                    className="absolute -top-2 right-2 translate-y-1/2 cursor-pointer text-gray-500 "
                  >
                    {showPassword ? <EyeIcon size={24} /> : <EyeOff size={24} />}
                  </button>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative pb-6">
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confrim Password"
                      className="bg-transparent placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={onShowConfirmPasswordClick}
                    className="absolute -top-2 right-2 translate-y-1/2 cursor-pointer text-gray-500 "
                  >
                    {showConfirmPassword ? <EyeIcon size={24} /> : <EyeOff size={24} />}
                  </button>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="container space-y-2">
              <Button loading={isPending} type="submit" variant="primary" className="w-full">
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
