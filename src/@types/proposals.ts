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

interface Status {
  _id: string;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface AssetContractId {
  _id: string;
  corporateId: string;
  userId: string;
  blockchainId: string;
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

interface MultisigContractId {
  _id: string;
  userId: string;
  name: string;
  blockchainId: string;
  contractAddress: string;
  minSignatures: number;
  createdAt: string;
  updatedAt: string;
  signers: Array<string>;
}

interface UserId {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IAllProposal {
  _id: string;
  userId: UserId;
  multisigContractId: MultisigContractId;
  assetContractId?: AssetContractId;
  proposalId: number;
  type: string;
  amount: number;
  signedBy: Array<string>;
  rejectedBy: Array<string>;
  isExecuted: boolean;
  signed: boolean;
  createdAt: string;
  updatedAt: string;
  status: Status;
  blockchain: Blockchain;
  data?: string;
}

export type AllProposalResponse = GlobalResponseWithPagination<Array<IAllProposal>>;
