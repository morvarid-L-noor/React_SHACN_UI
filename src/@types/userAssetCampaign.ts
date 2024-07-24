interface Industry {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface PublicSale {
  current: number;
  max: number;
}

interface CorporateId {
  _id: string;
  websiteURL: string;
  legalName: string;
  name: string;
  entityAddress: string;
  divisions: Array<string>;
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
interface AssetId {
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
  assetCampaignId: string;
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
}
export interface IAssetCampaign {
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
  currenciesAccepted: Array<string>;
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
  isFavorite: boolean;
}
export type UserAssetCampaignResponse = GlobalResponseWithPagination<Array<IAssetCampaign>>;

// Favorite Asset
interface IisFavoriteAsset {
  _id: string;
  userId: string;
  assetId: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}
export type TFavoriteAssetResponse = GlobalResponse<IisFavoriteAsset>;
