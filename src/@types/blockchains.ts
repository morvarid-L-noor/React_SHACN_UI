// START GET ALL BLOCKCHAINS

export type AllBlockchainsResponse = GlobalResponse<Array<Blockchain>>;

interface Blockchain {
  _id: string;
  name: string;
  symbol: string;
  icon: string;
  rpc: string;
  explorer: string;
  walletProvider: string;
  order: number;
  chainId: string | number;
}

// END GET ALL BLOCKCHAINS

// START GET ALL BLOCKCHAINS WITH FILTER

export type AllBlockchainsWithFilterResponse = GlobalResponseWithPagination<Array<Document_>>;

interface Document_ {
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

// END GET ALL BLOCKCHAINS WITH FILTER

// START GET A BLOCKCHAIN

// END GET A BLOCKCHAIN
