export type ICreateUserResponse = GlobalResponse<IOrganizationUsers>;

export type IOrganizationUsersResponse = GlobalResponseWithPagination<Array<IOrganizationUsers>>;

export interface IOrganizationUsers {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: string;
  verification: string;
  verified: boolean;
  isChangePassword: boolean;
  createdAt: string;
  updatedAt: string;
  corporateId: string;
  logoutTimeout: null;
  timezone: string;
}
export type UsersParameters = {
  limit?: number;
  page?: number;
  populate?: string;
};

export type IDeleteUserResponse = GlobalResponse<IDeleteUser>;

interface IDeleteUser {
  msg: string;
  moreInfo: string;
}
