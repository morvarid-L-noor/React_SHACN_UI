interface Industry {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface CurrenciesAccepted {
  _id: string;
  isActive: boolean;
  name: string;
  symbol: string;
  description: string;
  shortCode: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  order: number;
}
interface PublicSale {
  current: number;
  max: number;
}
interface AssetCampaignId {
  _id: string;
  userId: string;
  assetId: string;
  corporateId: string;
  images: Array<string>;
  videos: Array<string>;
  tags: Array<any>;
  logo: string;
  description: string;
  website: string;
  assetMaturity: string;
  securityPrice: number;
  couponRate: number;
  couponPayments: string;
  currenciesAccepted: Array<string>;
  minimumInvestment: number;
  profitShare: number;
  publicSale: PublicSale;
  privateSale: PublicSale;
  industry: string;
  companyStage: string;
  geographicMarket: string;
  competitors: string;
  createdAt: string;
  updatedAt: string;
}

interface MultiSigContractId {
  _id: string;
  userId: string;
  name: string;
  blockchainId: string;
  signers: Array<string>;
  contractAddress: string;
  minSignatures: number;
  createdAt: string;
  updatedAt: string;
}

interface BlockchainId {
  _id: string;
  name: string;
  symbol: string;
  icon: string;
  rpc: string;
  explorer: string;
  walletProvider: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  chainId: string;
}

interface CorporateId {
  _id: string;
  websiteURL: string;
  legalName: string;
  name: string;
  entityAddress: string;
  divisions: Array<any>;
  kycStatus: string;
  isAdminCreated: boolean;
  createdAt: string;
  updatedAt: string;
  uid: number;
}

interface UserId {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: string;
  verification: string;
  verified: boolean;
  isChangePassword: boolean;
  createdAt: string;
  updatedAt: string;
  corporateId: string;
  logoutTimeout: number;
  timezone: string;
  profilepic: string;
}
interface AssetId {
  _id: string;
  corporateId: CorporateId;
  userId: UserId;
  blockchainId: BlockchainId;
  multiSigContractId: MultiSigContractId;
  name: string;
  iconPath: string;
  ticker: string;
  decimalPlaces: number;
  contractAddress: string;
  deploymentTransactionHash: string;
  assetClass: string;
  isPublic: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
  assetCampaignId: AssetCampaignId;
}

export interface IAssetCampaignById {
  _id: string;
  userId: UserId;
  assetId: AssetId;
  corporateId: CorporateId;
  images: Array<string>;
  videos: Array<string>;
  tags: Array<any>;
  logo: string;
  description: string;
  website: string;
  assetMaturity: string;
  securityPrice: number;
  couponRate: number;
  couponPayments: string;
  currenciesAccepted: Array<CurrenciesAccepted>;
  minimumInvestment: number;
  profitShare: number;
  publicSale: PublicSale;
  privateSale: PublicSale;
  industry: Industry;
  companyStage: Industry;
  geographicMarket: Industry;
  competitors: Industry;
  createdAt: string;
  updatedAt: string;
  transactionCount: number;
  investors: number;
  totalTokenAmount: number;
  totalCurrencyAmount: number;
  isFavorite: boolean;
}

export type UserAssetCampaignByIdResponse = GlobalResponse<IAssetCampaignById>;
