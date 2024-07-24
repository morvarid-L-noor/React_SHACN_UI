import { z } from 'zod';

// Sign In Form Schema
export const SignInFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email({ message: 'Invalid email address' }),
  password: z.string().min(1, 'Password is required')
});
export type TSignInRequestParameters = z.infer<typeof SignInFormSchema>;

// Reset Password Form Schema
export const ResetPasswordFormSchema = z
  .object({
    resetToken: z.string(),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!#$%&*?@])[\d!#$%&*?@A-Za-z]{8,}$/, {
      message: 'Password must include at least 8 characters, one lowercase, one number and one special character'
    }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords should match',
    path: ['confirmPassword']
  });
export type TResetPasswordRequestParameters = z.infer<typeof ResetPasswordFormSchema>;

// Change Password Form Schema
export const ChangePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(1, 'Password is required'),
    newPassword: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!#$%&*?@])[\d!#$%&*?@A-Za-z]{8,}$/, {
      message: 'Password must include at least 8 characters, one lowercase, one number and one special character'
    }),
    confirmNewPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New passwords should match',
    path: ['confirmNewPassword']
  });
export type TChangePasswordRequestParameters = z.infer<typeof ChangePasswordFormSchema>;

// Sign Up Form Schema
export const SignUpFormSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'First Name is required')
      .min(3, { message: 'First Name must be at least 3 characters long' }),
    lastName: z
      .string()
      .min(1, 'Last Name is required')
      .min(3, { message: 'Last Name must be at least 3 characters long' }),
    roleId: z.string().min(1, 'Role is required'),
    email: z.string().min(1, 'Email is required').email({ message: 'Invalid email address' }),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!#$%&*?@])[\d!#$%&*?@A-Za-z]{8,}$/, {
      message: 'Password must include at least 8 characters, one lowercase, one number and one special character'
    }),

    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords should match.',
    path: ['confirmPassword']
  });
export type TSignUpRequestParameters = z.infer<typeof SignUpFormSchema>;

// OTP Schema
export const OTPFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email({ message: 'Invalid email address' }),
  otp: z.string().length(5, 'Your one-time password must be 5 characters long')
});
export type OTPFormData = z.infer<typeof OTPFormSchema>;

// Resend OTP Schema
export const ResendOTPFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email({ message: 'Invalid email address' })
});
export type ResendOTPFormData = z.infer<typeof ResendOTPFormSchema>;

// Forgot Password Form Schema
export const ForgotPasswordFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email({ message: 'Invalid email address' })
});
export type TForgotPasswordRequestParameters = z.infer<typeof ForgotPasswordFormSchema>;
