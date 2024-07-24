import { z } from 'zod';

// Create User Form Schema
export const CreateUserFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email({ message: 'Invalid email address' }),
  role: z.string().min(1, 'Role is required')
});
export type TCreateUserParameters = z.infer<typeof CreateUserFormSchema>;

// Edit User Form Schema
export const EditUserFormSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email({ message: 'Invalid email address' }),
  role: z.string().min(1, 'Role is required')
});
export type TEditUserParameters = z.infer<typeof EditUserFormSchema>;
