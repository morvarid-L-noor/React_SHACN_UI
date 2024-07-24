import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
// import { LogoSVG } from '@/assets/svg';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { TSignUpRequestParameters } from '@/lib/schemas/auth';
import { SignUpFormSchema } from '@/lib/schemas/auth';
import { register } from '@/services/dataServices/auth';
import { publicPaths } from '@/routes/client-paths';
import { useAppDispatch } from '@/app/store/hooks';
import { setUserEmailAddress } from '@/app/store/userSlice';
import { useGetAllRoles } from '@/services/dataServices/references/role';
import SignupSuccessMessageModal from '@/components/modals/SignupSuccessMessageModal';
import { RoleType } from '@/@types/roles';

function SignUpPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [showSignupSuccessModal, setShowSignupSuccessModal] = useState<boolean>(false);

  const onToggleSignupSuccessModal = () => {
    setShowSignupSuccessModal((s) => !s);
  };
  const dispatch = useAppDispatch();

  const onShowPasswordClick = () => {
    setShowPassword((s) => !s);
  };
  const onShowConfirmPasswordClick = () => {
    setShowConfirmPassword((s) => !s);
  };
  // React Hook Form
  const form = useForm<TSignUpRequestParameters>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      roleId: ''
    }
  });

  // Fill issuer role Id automatically
  const { data: roles, isSuccess } = useGetAllRoles();
  useEffect(() => {
    if (!isSuccess) return;
    const issuerId = roles?.filter((role) => role.label === RoleType.INVESTOR)[0]._id;
    if (issuerId) {
      form.setValue('roleId', issuerId);
    } else {
      toast.error('Investor role is not defined.');
    }
  }, [roles]);

  const { mutate: signup, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data) {
        dispatch(setUserEmailAddress(data?.response?.email));
        setShowSignupSuccessModal(true);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  const onFormSubmit = (formValues: TSignUpRequestParameters) => {
    signup(formValues);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Card className="max-w-lg space-y-5 border-none px-5 pb-12 pt-5 shadow-3xl md:px-10">
        {/* <LogoSVG width={150} /> */}
        <h4>Register Account</h4>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="pt-5">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1 pb-6">
                    <FormControl>
                      <Input placeholder="First Name" className="bg-transparent placeholder:text-gray-400" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1 pb-6">
                    <FormControl>
                      <Input placeholder="Last Name" className="bg-transparent placeholder:text-gray-400" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="pb-6">
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
                      placeholder="Confirm Password"
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
                Register
              </Button>
              <p className="text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link to={publicPaths.signIn} className="text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </Card>

      <SignupSuccessMessageModal open={showSignupSuccessModal} toggle={onToggleSignupSuccessModal} />
    </div>
  );
}

export default SignUpPage;
