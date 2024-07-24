// START GET ALL STATUSES

export interface AllStatusesResponse {
  success: boolean;
  response: Array<AllStatus>;
}

interface AllStatus {
  _id: string;
  label: string;
  description: string;
}

// END GET ALL STATUSES

// START GET ALL STATUSES WITH FILTER
export interface AllStatusesWithFilterResponse {
  success: boolean;
  response: AllStatusesWithFilter;
}

interface AllStatusesWithFilter {
  docs: Array<Status>;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: null;
}

interface Status {
  _id: string;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// END GET ALL STATUSES WITH FILTER

// START GET A STATUS

// END GET A STATUS
