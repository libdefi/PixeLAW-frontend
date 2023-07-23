import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { DojoProvider } from "@/hooks/dojo";
import { QueryClient, QueryClientProvider } from "react-query";
import {RpcProvider} from "starknet";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 20,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {

  return (
      <QueryClientProvider client={queryClient}>
        <DojoProvider>

            <Component {...pageProps} />
        </DojoProvider>
      </QueryClientProvider>
  );
}
