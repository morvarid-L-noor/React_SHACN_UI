import { z } from 'zod';

// Update Profile Form Schema
export const ProfileUpdateFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .regex(/^[\sA-Za-z]*$/, { message: 'Invalid First Name' }),
  lastName: z
    .string()
    .min(1, 'Last Name is required')
    .regex(/^[\sA-Za-z]*$/, { message: 'Invalid Last Name' }),
  email: z.string().min(1, 'Email is required').email({ message: 'Invalid email address' }),
  roleId: z.string().min(1, 'Role is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  logoutTimeout: z.string().min(1, 'Logout Timeout is required'),
  organizationName: z.string().min(1, 'Organization Name is required'),
  legalName: z.string().min(1, 'Legal Name is required'),
  websiteURL: z.string().min(1, 'Website is required'),
  entityAddress: z.string().min(1, 'Address is required')
});
export type TProfileUpdateParameters = z.infer<typeof ProfileUpdateFormSchema>;

// Update Profile Form Schema
export const ProfilePictureUpdateFormSchema = z.object({
  profilepic: z.string().min(1, 'Profile Picture is required')
});
export type TProfilePictureUpdateParameters = z.infer<typeof ProfilePictureUpdateFormSchema>;
