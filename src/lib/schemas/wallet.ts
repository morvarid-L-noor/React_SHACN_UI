import { z } from 'zod';

// Add New Wallet Modal Form Schema
export const AddNewWalletFormSchema = z.object({
  walletAddress: z.string().min(1, 'Wallet address is required')
});
export type TAddNewWalletForm = z.infer<typeof AddNewWalletFormSchema>;
