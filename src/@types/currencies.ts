// START GET ALL CURRENCIES

export type AllCurrenciesResponse = GlobalResponse<Array<AllCurrency>>;

interface AllCurrency {
  _id: string;
  isActive: boolean;
  name: string;
  symbol: string;
  description: string;
  shortCode: string;
  icon: string;
  order: number;
}

// END GET ALL CURRENCIES

// START GET ALL CURRENCIES WITH FILTER

export type AllCurrenciesWithFilterResponse = GlobalResponseWithPagination<Array<Currency>>;

interface Currency {
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

// END GET ALL CURRENCIES WITH FILTER

// START GET A CURRENCY

// END GET A CURRENCY
