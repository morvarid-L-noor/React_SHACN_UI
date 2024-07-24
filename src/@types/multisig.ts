// START CREATE MULTISIG
export type CreateMultisigResponse = GlobalResponse<IMultisig>;
export interface IMultisig {
  userId?: string;
  blockchainId?: string;
  signers?: unknown;
  contractAddress?: string;
  minSignatures?: number;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
export type DeployMultisigResponse = GlobalResponse<IDeployMultisig>;
export interface IDeployMultisig {
  rawTransaction?: RawTransaction;
}
export interface RawTransaction {
  chainId: number;
  data: string;
  from: string;
  gas: string;
  gasPrice: string;
}

interface Wallets {
  _id: string;
  isActive: boolean;
  userId: string;
  thirdPartyIntegrationId: string;
  walletAddress: string;
  blockchainId: string;
  createdAt: string;
  updatedAt: string;
}
export interface ISigner {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  corporateId: string;
  wallets: Wallets;
}

export type GetSignersResponse = GlobalResponse<ISigner>;

interface Blockchain {
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

export type BlockchainResponse = GlobalResponseWithPagination<Array<Blockchain>>;
