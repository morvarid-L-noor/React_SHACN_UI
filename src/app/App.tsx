import SuccessModal from '@/components/modals/SuccessModal';
import { Toaster } from '@/components/ui/sonner';
import { MetaMaskProvider } from '@metamask/sdk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import { persistor, store } from './store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistGate } from 'redux-persist/integration/react';
import Spinner from '@/components/loadings/spinner';
import { TooltipProvider } from '@/components/ui/tooltip';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
        gcTime: 0
      }
    }
  });

  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: 'TPlus',
          url: window.location.href
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <ReduxProvider store={store}>
            <PersistGate loading={<Spinner />} persistor={persistor}>
              <AuthProvider>
                <ReactQueryDevtools />
                <TooltipProvider>
                  <Outlet />
                </TooltipProvider>
                <SuccessModal />
              </AuthProvider>
            </PersistGate>
          </ReduxProvider>
          <Toaster
            richColors
            toastOptions={{
              classNames: {
                loading: 'bg-gray-300 dark:bg-gray-600 text-foreground'
              }
            }}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </MetaMaskProvider>
  );
}

export default App;
