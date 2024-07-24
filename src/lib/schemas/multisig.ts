import { z } from 'zod';

// create multisig - Supported Blockchain Form Schema
export const SupportedBlockchainFormSchema = z.object({
  blockchain: z.string().min(1, 'Blockchain is required'),
  chainId: z.string()
});
export type TSupportedBlockchainForm = z.infer<typeof SupportedBlockchainFormSchema>;

// create multisig - Contract Rules Form Schema
export const ContractRulesFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  numberOfSigners: z.string().min(1, 'Number of signers is required'),
  minSignatures: z.string().min(1, 'Minimum signatures is required'),
  signerAddresses: z.union([z.array(z.string()), z.string()]), // Refine the type
  isChecked: z.boolean().refine((value) => value === true, {
    message: 'Please accept terms and condition',
    path: ['isChecked']
  })
});
export type TContractRulesForm = z.infer<typeof ContractRulesFormSchema>;
