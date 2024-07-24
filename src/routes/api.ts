export const apiRoutes = {
  signIn: '/login',
  signUp: '/register',
  refreshToken: '/refreshToken',
  verifyOTP: '/verifyOTP',
  resendOTP: '/resendVerificationCode',
  forgotPassword: '/forgot',
  changePassword: '/changePassword',
  resetPassword: '/resetPassword',
  profile: {
    GET: '/profile',
    update: '/profile',
    updateProfilePicture: '/profile',
    getSignedURL: '/profile/getSignedUrl'
  },
  transaction: {
    GETALL: ({ limit, page, search }: RequestsFilterParameters) =>
      search
        ? `/transactions/investor?page=${page}&limit=${limit}&search=${search}`
        : `/transactions/investor?page=${page}&limit=${limit}`,
    GET: (id: string) => `/transactions/${id}`
  },
  favoriteAsset: {
    GETALL: ({ limit, page }: RequestsFilterParameters) => `/favoriteAssets/user?page=${page}&limit=${limit}`,
    GET: (id: string) => `/favoriteAssets/${id}`,
    create: '/favoriteAssets'
  },
  userAssetCampaign: {
    GETALL: ({ limit, page, search }: RequestsFilterParameters) =>
      search
        ? `/assetCampaign?page=${page}&limit=${limit}&search=${search}`
        : `/assetCampaign?page=${page}&limit=${limit}`,
    GET: (id: string) => `/assetCampaign/${id}`
  },
  wallet: {
    getWalletProviders: '/thirdPartyIntegration/all',
    getWalletProviderById: (id: string) => `/thirdPartyIntegration/${id}`,
    getWalletAddressById: (id: string) => `/userIntegration/${id}`,
    deleteWalletAddressById: (id: string) => `/userIntegration/${id}`,
    activateWalletAddress: `/userIntegration/activate`,
    deactivateWalletAddress: `/userIntegration/deactivate`,
    addNewWalletAddress: '/userIntegration'
  },
  references: {
    getAllRoles: '/roles/all'
  },
  userAssetContract: {
    GETALL: '/userAssetContracts/all',
    GETByFilter: '/userAssetContracts',
    GETOrganizationAssetsByFilter: '/userAssetContracts/organization',
    GETById: (id: string) => `/userAssetContracts/${id}`
  }
};
export const ledgerRoutes = {
  deployMultisigContract: '/TetherPlusMultiSig/deployTetherPlusMultiSig',
  updateMinSignatures: '/TetherPlusMultiSig/updateMinConfirmations',
  getTransactionCount: '/TetherPlusMultiSig/getTransactionCount',
  deployTPlusContract: '/TetherPlus/deployTetherPlus',
  creationBasket: '/TetherPlus/creationBasket',
  getMultisigTransactionCount: '/TetherPlusMultiSig/getTransactionCount',
  addMultisigSigner: '/TetherPlusMultiSig/addOwner',
  removeMultisigSigner: '/TetherPlusMultiSig/removeOwner',
  approveTransaction: '/TetherPlusMultiSig/confirmTransaction',
  rejectTransaction: '/TetherPlusMultiSig/revokeConfirmation',
  getTotalTokenSupply: '/TetherPlus/getTotalSupply',
  redemptionBasket: '/TetherPlus/redemptionBasket'
};
