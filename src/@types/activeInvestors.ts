interface PublicSale {
  current: number;
  max: number;
}

interface AssetCampaignId {
  _id: string;
  images: Array<string>;
  logo: string;
  publicSale: PublicSale;
}

interface BlockchainId {
  _id: string;
  name: string;
  symbol: string;
  icon: string;
}

interface UserAssetContract {
  _id: string;
  corporateId: string;
  userId: string;
  blockchainId: BlockchainId;
  multiSigContractId: string;
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
  kycTemplateAvailable: boolean;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: string;
  verified: boolean;
  corporateId: string;
}

export interface ActiveInvestors {
  _id: string;
  totalCurrencyAmount: number;
  userAssetContracts: Array<UserAssetContract>;
  user: User;
}

export type ActiveInvestorsResponse = GlobalResponseWithPagination<Array<ActiveInvestors>>;
