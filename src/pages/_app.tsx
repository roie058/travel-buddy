import Layout from '@/components/layout/Layout'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {SessionProvider} from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import React from 'react'

export const  queryClient=new QueryClient()
 function App({ Component, pageProps }: AppProps) {
 

  return(
<QueryClientProvider client={queryClient}>
  <SessionProvider session={pageProps.session}>
<Layout><Component {...pageProps} /></Layout>
</SessionProvider> 
<ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
)}

export default appWithTranslation(App)
