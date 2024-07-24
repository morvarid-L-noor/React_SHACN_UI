// START GET ALL THIRDPARTYINTEGRATIONS

export type AllThirdPartyIntegrationsResponse = GlobalResponse<Array<AllThirdPartyIntegrations>>;

interface AllThirdPartyIntegrations {
  _id: string;
  integrations: Array<ThirdPartyIntegration>;
}

export interface ThirdPartyIntegration {
  _id: string;
  group: string;
  groupName: string;
  name: string;
  logo: string;
  summary: string;
  details: string;
  addlDetails: string;
  groupOrder: number;
  blockchainId: BlockchainId;
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
  chainId: string | number;
}

// END GET ALL THIRDPARTYINTEGRATIONS

// START GET A THIRDPARTYINTEGRATION

export interface ThirdPartyIntegrationResponse {
  success: boolean;
  response: ThirdPartyIntegration;
}

// END GET A THIRDPARTYINTEGRATION

// START GET USER INTEGRATION
export type UserIntegrationsResponse = GlobalResponse<UserIntegration>;
export interface UserIntegration {
  _id: string;
  userId: string;
  blockchainId: string;
  isActive: boolean;
  thirdPartyIntegrationId: string;
  createdAt: string;
  updatedAt: string;
  wallets: Array<any>;
}
