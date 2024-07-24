// START ALL TRANSACTIONS
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
  chainId: string | number;
}
interface CorporateId {
  _id: string;
  legalName: string;
  divisions: Array<string>;
  createdAt: string;
  updatedAt: string;
}

interface UserId {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  corporateId: string;
}

interface MultiSigContractId {
  _id: string;
  userId: string | UserId;
  name: string;
  blockchainId: string | BlockchainId;
  signers: Array<string>;
  contractAddress: string;
  minSignatures: number;
  createdAt: string;
  updatedAt: string;
}
interface UserAssetContractId {
  _id: string;
  corporateId: string | CorporateId;
  userId: string | UserId;
  blockchainId: string | BlockchainId;
  multiSigContractId: string | MultiSigContractId;
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
interface StatusId {
  _id: string;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface CurrencyId {
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

interface AssetContractId {
  _id: string;
  corporateId: string;
  userId: string | UserId;
  blockchainId: string;
  multiSigContractId: string;
  name: string;
  ticker: string;
  decimalPlaces: number;
  contractAddress: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProposalId {
  _id: string;
  userId: string | UserId;
  multisigContractId: string | MultiSigContractId;
  assetContractId: string | AssetContractId;
  proposalId: number | string | ProposalId;
  type: string;
  amount: number;
  signedBy: Array<string>;
  rejectedBy: Array<string>;
  isExecuted: boolean;
  signed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AllTransactions {
  _id: string;
  userId: UserId;
  blockchainId: string | BlockchainId;
  UserAssetContract: UserAssetContractId;
  statusId: StatusId;
  currencyId: CurrencyId;
  type: string;
  totalCurrencyAmount: number;
  totalTokenAmount: number;
  destinationWalletAddress: string;
  method: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  proposalId: number | string | ProposalId;
  transactionHash?: string;
  referenceId?: string;
  internalMemo?: string;
  bankCertificate?: string;
  bankTransferTime?: string;
}

export type AllTransactionsResponse = GlobalResponseTransactionsWithPagination<Array<AllTransactions>>;

// END ALL TRANSACTIONS
