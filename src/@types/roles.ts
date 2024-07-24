// START GET ALL ROLES
export enum RoleType {
  SIGNER = 'Signer',
  ISSUER = 'Issuer',
  INVESTOR = 'Investor'
}
export interface IRole {
  _id: string;
  role: RoleType;
  label: RoleType;
}
export type IRoleResponse = GlobalResponse<Array<IRole>>;

// END GET ALL ROLES

// START GET ALL ROLES WITH FILTER

export interface AllRolesWithFilterResponse {
  success: boolean;
  response: AllRolesWithFilter;
}

interface AllRolesWithFilter {
  docs: Array<Document_>;
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

interface Document_ {
  _id: string;
  role: RoleType;
  label: string;
  createdAt: string;
  updatedAt: string;
}

// END GET ALL ROLES WITH FILTER
