import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalStyle } from "../styles/GlobalStyle";
import { ReactQueryDevtools } from "react-query/devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
