import Layout from '@/components/layout/Layout'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { LoadScript } from '@react-google-maps/api';

import {SessionProvider} from 'next-auth/react'

const libraries:("geometry" | "drawing" | "places" | "localContext" | "visualization")[] =['geometry', 'drawing', 'places']
export default function App({ Component, pageProps }: AppProps) {


  return(
  <SessionProvider session={pageProps.session}>

   <LoadScript
  googleMapsApiKey={`${process.env.MAPS_API_KEY}`}
  libraries={libraries}
><Layout><Component {...pageProps} /></Layout></LoadScript>
</SessionProvider> 
)}

