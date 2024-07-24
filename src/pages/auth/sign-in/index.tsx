import { useAppDispatch } from '@/app/store/hooks';
import { setUserEmailAddress } from '@/app/store/userSlice';
// import { LogoSVG } from '@/assets/svg';
import ForgotPasswordModal from '@/components/modals/ForgotPasswordModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { TSignInRequestParameters } from '@/lib/schemas/auth';
import { SignInFormSchema } from '@/lib/schemas/auth';
import { publicPaths } from '@/routes/client-paths';
import { login } from '@/services/dataServices/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const onShowPasswordClick = () => {
    setShowPassword((s) => !s);
  };

  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState<boolean>(false);
  const onToggleForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen((s) => !s);
  };

  // React Hook Form
  const form = useForm<TSignInRequestParameters>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { mutate: signin, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error.message);
    }
  });
  const onFormSubmit = (formValues: TSignInRequestParameters) => {
    dispatch(setUserEmailAddress(formValues.email));
    signin(formValues);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center lg:p-10">
      <Card className="max-w-lg space-y-5 border-none px-5 pb-12 pt-5 shadow-3xl md:px-10">
        {/* <LogoSVG width={150} /> */}
        <h4>Login to your account</h4>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-3 pt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      className="bg-transparent placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
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

                  <span
                    className="absolute bottom-0 right-0 cursor-pointer text-xs text-gray-400"
                    onClick={onToggleForgotPasswordModal}
                  >
                    Forgot Password?
                  </span>
                </FormItem>
              )}
            />
            <div className="container space-y-2">
              <Button loading={isPending} type="submit" variant="primary" className="w-full ">
                Sign In
              </Button>
              <p className="text-center text-sm text-gray-400">
                Don&apos;t have an account?{' '}
                <Link to={publicPaths.signUp} className="text-primary">
                  Create An Account
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </Card>
      <ForgotPasswordModal open={isForgotPasswordModalOpen} toggle={onToggleForgotPasswordModal} />
    </div>
  );
};

export default SignInPage;
