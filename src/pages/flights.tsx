
import Flights from '@/components/pageCompnents/Flights'

import Head from 'next/head'
import Script from 'next/script'
import React from 'react'

type Props = {}


const flights = (props: Props) => {

  
  
  return (
    <>
    <Head>
    <title>Travel Buddy | Flights</title>
    <meta name="description" content="travel buddy flights add and search" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  
  <Flights  />
  <Footer/>
  <Script  onError={(e)=>{console.log(e);
  }}   src="https://widgets.skyscanner.net/widget-server/js/loader.js" defer={false}  strategy="lazyOnload" />
    </>
  )
}

export default flights

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Footer from '@/components/layout/Footer'

export async function getStaticProps({ locale }) {

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common","flights"
      ])),
      // Will be passed to the page component as props
    },
  }
}