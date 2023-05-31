
import Head from 'next/head'

import React from 'react'


import Hotels from '@/components/pageCompnents/Hotels'

type Props = {}

const hotels = (props: Props) => {


    return (
        <>
        <Head>
        <title>Travel Buddy</title>
        <meta name="description" content="travel buddy hotel add and search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      
        <Hotels/>
        </>
      )
    }
  
    import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common","hotels"
      ])),
      // Will be passed to the page component as props
    },
  }
}


export default hotels