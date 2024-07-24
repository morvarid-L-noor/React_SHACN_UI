// START GET ALL USER MULTISIGCONTRACTS

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

interface UserId {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: string;
  verification: string;
  verified: boolean;
  corporateId: string;
  isChangePassword: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Wallet {
  _id: string;
  userId: string;
  blockchainId: string;
  isActive: boolean;
  thirdPartyIntegrationId: string;
  walletAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISigner {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: string;
  verification: string;
  verified: boolean;
  corporateId: string;
  isChangePassword: boolean;
  createdAt: string;
  updatedAt: string;
  wallet: Wallet;
}

export interface MultiSigContract {
  _id: string;
  userId: UserId;
  name: string;
  blockchainId: BlockchainId;
  signers: Array<ISigner>;
  contractAddress: string;
  minSignatures: number;
  createdAt: string;
  updatedAt: string;
}

export type MultiSigContractResponse = GlobalResponseWithPagination<Array<MultiSigContract>>;

// END GET A USER MULTISIGCONTRACT
interface manageRules {
  _id: string;
  userId: UserId;
  name: string;
  blockchainId: BlockchainId;
  contractAddress: string;
  minSignatures: number;
  createdAt: string;
  updatedAt: string;
  signers: Array<ISigner>;
}

export type MultiSigContractByIdResponse = GlobalResponse<manageRules>;
