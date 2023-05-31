

import MapPage from '@/components/pageCompnents/MapPage'
import Head from 'next/head'



export default function map() {

return (
    <>
      <Head>
        <title>Travel Buddy</title>
        <meta name="description" content="travel buddy Atraction Map" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MapPage/>
    
      
    </>
  )
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common","map"
      ])),
      // Will be passed to the page component as props
    },
  }
}

