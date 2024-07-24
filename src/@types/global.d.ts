declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

type GlobalResponse<T> = {
  response: T;
  success: true;
};
// | {
//     success: false;
//     msg: string;
//     moreInfo: string;
//     errorCode: string;
//   };

type GlobalResponseWithPagination<T> = {
  response: IResult<T>;
  success: true;
};

type GlobalResponseTransactionsWithPagination<T> = {
  response: {
    transactions: IResult<T.transactions>;
    summary: T.summary;
  };
  success: true;
};
// | {
//     success: false;
//     msg: string;
//     moreInfo: string;
//     errorCode: string;
//   };
interface IResult<T> {
  docs: T;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: number;
}

type RequestsFilterParameters = {
  limit?: number;
  page?: number;
  search?: string;
};
