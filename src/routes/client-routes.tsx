import App from '@/app/App';
import AuthPagesLayout from '@/layout/auth';
import Layout from '@/layout/private';
import { accessTokenCookieName } from '@/lib/constants';
import AssetOverviewPage from '@/pages/asset-overview';
import AssetDetailsPage from '@/pages/asset-overview/asset-details';
import AssetPublicPage from '@/pages/asset-overview/asset-details/public-page';
import ResetPasswordPage from '@/pages/auth/reset-password';
import SignInPage from '@/pages/auth/sign-in';
import SignUpPage from '@/pages/auth/sign-up';
import VerifyOTPPage from '@/pages/auth/verify-otp';
import ErrorPage from '@/pages/error';
import KYCApplicationPage from '@/pages/kyc-application';
import ProfilePage from '@/pages/profile';
import ProfileUpdatePage from '@/pages/profile/update';
import SettingsPage from '@/pages/settings';
import TransactionPage from '@/pages/transactions';
import ManageWalletsPage from '@/pages/wallets';
import WalletDetailsPage from '@/pages/wallets/wallet-details';
import cookies from 'js-cookie';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { privatePaths, publicPaths } from './client-paths';
import OpportunitiesPage from '@/pages/opportunities';
import OpportunityDetailsPage from '@/pages/opportunities/opportunity-details';
import MainPage from '@/pages/main';

const isAuthenticated = !!cookies.get(accessTokenCookieName);
const privateRoutes = [
  {
    path: '/',
    element: <Layout />,
    loader: () => {
      if (!isAuthenticated) return redirect(publicPaths.signIn);

      return null;
    },
    children: [
      {
        index: true,
        element: <OpportunitiesPage />
      },
      {
        path: `${privatePaths.opportunity_details}/:id`,
        element: <OpportunityDetailsPage />
      },
      {
        path: privatePaths.assetOverview,
        element: <AssetOverviewPage />
      },
      {
        path: privatePaths.settings,
        element: <SettingsPage />
      },
      {
        path: privatePaths.manageWallet,
        element: <ManageWalletsPage />
      },
      {
        path: privatePaths.walletDetails,
        element: <WalletDetailsPage />
      },
      {
        path: `${privatePaths.assetDetails}/:id`,
        element: <AssetDetailsPage />
      },
      {
        path: `${privatePaths.assetPublicPage}/:id`,
        element: <AssetPublicPage />
      },
      {
        path: privatePaths.profile,
        element: <ProfilePage />
      },
      {
        path: privatePaths.editProfile,
        element: <ProfileUpdatePage />
      },
      {
        path: privatePaths.transactions,
        element: <TransactionPage />
      },
      {
        path: privatePaths.kycApplication,
        element: <KYCApplicationPage />
      },
      {
        path: '*',
        loader: () => redirect('/'),
        element: <div>NotFound </div>
      }
    ]
  }
];

const publicRoutes = [
  {
    path: '/',
    element: <AuthPagesLayout />,
    loader: () => {
      if (isAuthenticated) return redirect('/');
      return null;
    },
    children: [
      {
        index: true,
        loader: () => {
          return redirect(publicPaths.signIn);
        }
      },
      {
        path: publicPaths.signIn,
        element: <SignInPage />
      },
      {
        path: publicPaths.signUp,
        element: <SignUpPage />
      },
      {
        path: publicPaths.forgotPassword,
        element: <div>ForgotPassword</div>
      },
      {
        path: publicPaths.resetPassword,
        element: <ResetPasswordPage />
      },
      {
        path: publicPaths.resetPasswordById,
        element: <ResetPasswordPage />
      },
      {
        path: publicPaths.verifyOTP,
        element: <VerifyOTPPage />
      },
      {
        path: publicPaths.SetPassword,
        element: <div>SetPassword</div>
      },
      {
        path: '*',
        loader: () => {
          return redirect(publicPaths.signIn);
        },
        element: <div>NotFound</div>
      }
    ]
  },
  {
    path: publicPaths.mainPage,
    element: <MainPage />
  }
];

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: isAuthenticated ? privateRoutes : publicRoutes
  }
]);
