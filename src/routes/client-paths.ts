export const privatePaths = {
  home: '/',
  dashboard: '/dashboard',
  settings: '/settings',
  kyc: '/kyc',
  notification: '/settings/notification',
  organization: '/organization',
  manageWallet: '/settings/manage-wallet',
  walletDetails: '/settings/manage-wallet/:id',
  opportunity_details: '/opportunity-details',
  assetOverview: '/asset-overview',
  assetDetails: '/asset-overview/asset-details',
  assetPublicPage: '/asset-overview/public-page',
  profile: '/settings/profile',
  editProfile: '/settings/profile/edit-profile',
  transactions: '/transactions',
  supportedBlockchain: '/create-multisig-contract/supported-blockchain',
  contractRules: '/create-multisig-contract/contract-rules',
  reviewDeploy: '/create-multisig-contract/review-deploy',
  manageRules: '/settings/multisig-contract',
  acquirementById: '/acquirement/:id',
  kycApplication: '/kyc-application'
};
export const publicPaths = {
  signIn: '/sign-in',
  signUp: '/sign-up',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  resetPasswordById: '/reset-password/:id',
  verifyOTP: '/verify-otp',
  SetPassword: '/set-password',
  mainPage: '/mainPage'
};
