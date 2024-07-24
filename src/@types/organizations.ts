// START GET USER ORGANIZATION

export type UserOrganizationResponse = GlobalResponse<Organization>;

// END GET USER ORGANIZATION

// START GET ALL ORGANIZATIONS

export type AllOrganizationsResponse = GlobalResponseWithPagination<Array<Organization>>;

interface Organization {
  _id: string;
  legalName: string;
  divisions: Array<string>;
  websiteURL?: string;
  name?: string;
  entityAddress?: string;
  logo?: string;
}

// END GET ALL ORGANIZATIONS
