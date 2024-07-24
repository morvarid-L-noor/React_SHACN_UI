// START GET ALL FEES

export type AllFeesResponse = GlobalResponse<Array<AllFee>>;

interface AllFee {
  _id: string;
  creationFee: number;
  redeemptionFee?: number;
  transferFee?: number;
  assetContractId?: string;
  redemptionFee?: number;
}

// END GET ALL FEES

// START GET ALL FEES WITH FILTER

export type AllFeesWithFilterResponse = GlobalResponseWithPagination<Array<Fee>>;

interface Fee {
  _id: string;
  creationFee: number;
  redemptionFee: number;
  transferFee: number;
  assetContractId: string;
  createdAt: string;
  updatedAt: string;
}

// END GET ALL FEES WITH FILTER

// START GET A FEE

// END GET A FEE
