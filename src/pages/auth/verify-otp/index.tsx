import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// import { LogoSVG } from '@/assets/svg';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import type { ResendOTPFormData, OTPFormData } from '@/lib/schemas/auth';
import { OTPFormSchema } from '@/lib/schemas/auth';
import { resnedOTP, verifyOTP } from '@/services/dataServices/auth';
import { publicPaths } from '@/routes/client-paths';
import { useAppSelector } from '@/app/store/hooks';
import { useEffect } from 'react';

function VerifyOTPPage() {
  const email = useAppSelector((state) => state.user.email);
  const navigate = useNavigate();
  // React Hook Form
  const form = useForm<OTPFormData>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      email: '',
      otp: ''
    }
  });

  useEffect(() => {
    if (email) {
      form.setValue('email', email);
    }
  }, [email]);

  const { mutate: otpVerify, isPending } = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success('Successfully verified.');
        setTimeout(() => {
          navigate(publicPaths.signIn);
        }, 1000);
      } else {
        toast.error(data?.msg);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const onFormSubmit = (formValues: OTPFormData) => {
    if (email) {
      otpVerify(formValues);
    }
  };

  const onHandleResendOTP = (formValues: ResendOTPFormData) => {
    handleResendOTP(formValues);
  };

  const { mutate: handleResendOTP } = useMutation({
    mutationFn: resnedOTP,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success('OTP Sent.');
      } else {
        toast.error(data?.msg);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  useEffect(() => {
    form.setFocus('otp');
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Card className="w-[60%] space-y-5 border-none px-5 pb-12 pt-5 shadow-3xl md:px-10">
        <Link to={publicPaths.signIn}>{/* <LogoSVG width={150} /> */}</Link>
        <h1 className="text-2xl">OTP Verification</h1>
        {/* <p className="text-gray-400">Verify your account using the One-Time Password we sent to your email.</p> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center pb-6">
                  <FormControl>
                    <InputOTP maxLength={5} {...field}>
                      <InputOTPGroup className="space-x-2">
                        <InputOTPSlot className="rounded-sm border p-6 text-xl" index={0} />
                        <InputOTPSlot className="rounded-sm border p-6 text-xl" index={1} />
                        <InputOTPSlot className="rounded-sm border p-6 text-xl" index={2} />
                        <InputOTPSlot className="rounded-sm border p-6 text-xl" index={3} />
                        <InputOTPSlot className="rounded-sm border p-6 text-xl" index={4} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="container space-y-2">
              <Button loading={isPending} type="submit" variant="primary" className="w-full">
                Verify
              </Button>
              <p className="text-center text-sm text-gray-400">
                {`Don't receive code?`}
                <Link
                  to={'.'}
                  onClick={() => {
                    onHandleResendOTP({ email: form.getValues('email') });
                  }}
                  className="ml-1 text-primary"
                >
                  Resend OTP
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default VerifyOTPPage;
