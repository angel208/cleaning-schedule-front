import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import customTheme from '../theme/theme';


function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ChakraProvider theme={customTheme}>  
      <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </ChakraProvider>
    
  )
}

export default MyApp
