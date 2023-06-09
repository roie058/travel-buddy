

import WeatherPage from '@/components/pageCompnents/WeatherPage'

import Head from 'next/head'
import React from 'react'

type Props = {}

const weather = (props: Props) => {
    return (
        <>
        <Head>
        <title>Travel Buddy | Weather</title>
        <meta name="description" content="travel buddy weather" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      
       <WeatherPage/>
       <Footer/>
        </>
      )
}

export default weather


import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Footer from '@/components/layout/Footer'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common","form"
      ])),
      // Will be passed to the page component as props
    },
  }
}