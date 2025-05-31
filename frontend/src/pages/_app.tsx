import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { initializeAuth } from '../store/auth';
import { initializeTheme } from '../utils/theme';
import { initializeStorageCleanup } from '../utils/storage';
import { Notifications } from '../components/ui/Notifications';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import '../styles/globals.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize app on client side
    const initialize = async () => {
      try {
        // Initialize theme
        initializeTheme();
        
        // Initialize storage cleanup
        initializeStorageCleanup();
        
        // Initialize auth state
        await initializeAuth();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initialize();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-color)',
              border: '1px solid var(--toast-border)',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
        <Notifications />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
