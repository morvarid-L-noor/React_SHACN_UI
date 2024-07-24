// START GET PROFILE
export type GetProfileResponse = GlobalResponse<IProfile>;
export interface IProfile {
  corporateId?: CorporateId;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilepic: string;
  isActive: boolean;
  role: string;
  verification: string;
  verified: boolean;
  isChangePassword: boolean;
  createdAt: string;
  updatedAt: string;
  logoutTimeout: null;
  timezone: string;
}

interface CorporateId {
  _id: string;
  websiteURL: string;
  legalName: string;
  name: string;
  entityAddress: string;
  divisions: Array<any>;
  createdAt: string;
  updatedAt: string;
}

// Profile Picture Update
export type ProfilePicUpdateResponse = GlobalResponse<{ profilePicURL: string }>;
