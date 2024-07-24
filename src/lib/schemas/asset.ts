import { z } from 'zod';

// Issue Asset - Asset Information Form Schema
export const AssetInformationFormSchema = z.object({
  iconPath: z.unknown().refine((value) => value !== undefined && value !== null, {
    message: 'Icon Path is required',
    path: ['iconPath']
  }),
  name: z.string().min(1, 'Asset name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  ticker: z.string().min(1, 'Asset ticker is required'),
  assetClass: z.string().min(1, 'Please select asset class'),
  description: z.string().min(1, 'Description is required'),
  isChecked: z.boolean().refine((value) => value === true, {
    message: 'Please accept terms and condition',
    path: ['isChecked']
  })
});
export type TAssetInformationForm = z.infer<typeof AssetInformationFormSchema>;

// Issue Asset - Offering Overview Form Schema
export const OfferingOverviewFormSchema = z.object({
  decimalPlaces: z.number().min(1, 'Decimal Places is required'),
  securityPrice: z.string().min(1, 'Security Price is required'),
  couponRate: z.string().min(1, 'Coupon Rate Price is required'),
  couponPayments: z.string().min(1, 'Coupon Payments is required'),
  minimumInvestment: z.string().min(1, 'Minimum investment is required'),
  admission: z.string().min(1, 'Admission is required'),
  issuerContract: z.string().min(1, 'Issuer Contract is required'),
  maturityDate: z.date().optional()
});
export type TOfferingOverviewForm = z.infer<typeof OfferingOverviewFormSchema>;

// Issue Asset - Choose Blockchain Form Schema
export const ChooseBlockchainFormSchema = z.object({
  blockchainId: z.string().min(1, 'Blockchain Id is required'),
  multisigContractAddress: z.string().min(1, 'multisig contract address is required'),
  walletName: z.string().min(1, 'Wallet name is required')
});
export type TChooseBlockchainForm = z.infer<typeof ChooseBlockchainFormSchema>;

// Issue Asset - Choose Kyc Template Form Schema
export const ChooseKycTemplateFormSchema = z.object({
  currenciesAccepted: z.string().min(1, 'Private Sale is required')
});
export type TChooseKycTemplateForm = z.infer<typeof ChooseKycTemplateFormSchema>;

// Issue Asset - Public Asset Information Form Schema
export const PublicAssetInformationFormSchema = z.object({
  images: z.unknown().refine((value) => value !== undefined && value !== null, {
    message: 'Logo is required',
    path: ['images']
  }),
  videos: z.unknown().refine((value) => value !== undefined && value !== null, {
    message: 'Videos is required',
    path: ['videos']
  }),
  logo: z.unknown().refine((value) => value !== undefined && value !== null, {
    message: 'Logo is required',
    path: ['logo']
  }),
  description: z.string().min(1, 'Description is required'),
  website: z.string().min(1, 'Website is required'),
  assetMaturity: z.string().min(1, 'Asset maturity is required'),
  industry: z.string().min(1, 'Industry is required'),
  currenciesAccepted: z.string().min(1, 'Private Sale is required'),
  minimumInvestment: z.string().min(1, 'Minimum investment is required'),
  profitShare: z.string().min(1, 'Profit Share is required'),
  publicSale: z.string().min(1, 'Public Sale is required'),
  privateSale: z.string().min(1, 'Private Sale is required'),
  companyStage: z.string().min(1, 'Company Stage is required'),
  geographicMarket: z.string().min(1, 'Geographic Market is required'),
  competitors: z.string().min(1, 'Competitors is required')
});
export type TPublicAssetInformationForm = z.infer<typeof PublicAssetInformationFormSchema>;
