interface PublicSale {
  current: number;
  max: number;
}

interface BlockchainId {
  _id: string;
  name: string;
  symbol: string;
  icon: string;
}
interface AssetCampaignId {
  _id: string;
  images: Array<string>;
  logo: string;
  publicSale: PublicSale;
}
export interface IUserAssetContracts {
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
export type TUserAssetContractsResponse = GlobalResponseWithPagination<Array<IUserAssetContracts>>;

// Get User Asset Contract By Id
interface Stats {
  uniqueInvestors: number;
  totalTokenAmount: number;
  totalCurrencyAmount: number;
  transactionCount: number;
}
interface UserIdById {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  corporateId: string;
}
interface BlockchainIdById {
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
  chainId: number;
}
interface AssetCampaignIdById {
  publicSale: PublicSale;
  privateSale: PublicSale;
  tags: Array<any>;
  _id: string;
  userId: string;
  assetId: string;
  corporateId: string;
  images: Array<string>;
  videos: Array<string>;
  logo: string;
  description: string;
  website: string;
  assetMaturity: string;
  securityPrice: number;
  couponRate: number;
  couponPayments: string;
  issuerContacts: string;
  currenciesAccepted: Array<string>;
  minimumInvestment: number;
  profitShare: number;
  industry: string;
  companyStage: string;
  geographicMarket: string;
  competitors: string;
  createdAt: string;
  updatedAt: string;
}
interface IUserAssetContractById {
  _id: string;
  corporateId: string;
  userId: UserIdById;
  blockchainId: BlockchainIdById;
  multiSigContractId: string;
  name: string;
  iconPath: string;
  ticker: string;
  decimalPlaces: number;
  contractAddress: string;
  deploymentTransactionHash: string;
  assetClass: string;
  isPublic: boolean; // Investor public page
  description: string;
  createdAt: string;
  updatedAt: string;
  assetCampaignId: AssetCampaignIdById; // Isssuer Public page
  stats: Stats;
}
export type TUserAssetContractByIdResponse = GlobalResponse<IUserAssetContractById>;

// Get Total Token Supply
export type TTotalTokenSupplyResponse = GlobalResponse<{
  TotalSupply: number;
}>;
export type TTotalTokenSupplyRequest = {
  chainId: number;
  tPlusContractAddress: string;
};
