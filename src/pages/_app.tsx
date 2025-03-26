import type { AppProps } from 'next/app';
import { ToastContainer } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const { toasts } = useToast();

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer toasts={toasts} />
    </>
  );
} 