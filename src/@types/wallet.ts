export type IDeleteWalletResponse = GlobalResponse<IDeleteWallet>;

interface IDeleteWallet {
  msg: string;
  moreInfo: string;
}

export type IAddWalletResponse = GlobalResponse<IAddWallet>;

interface IAddWallet {
  _id: string;
  userId: string;
  blockchainId: string;
  isActive: boolean;
  thirdPartyIntegrationId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  wallets: Array<Wallet>;
}

interface Wallet {
  _id: string;
  blockchainId: string;
  isActive: boolean;
  walletAddress: string;
  createdAt: string;
  updatedAt: string;
}
