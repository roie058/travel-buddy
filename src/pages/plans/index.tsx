


import PlansPage from '@/components/pageCompnents/PlansPage'
import Head from 'next/head'




export default function Plan() {

  return (
    <>
      <Head>
        <title>Travel Buddy | My Plans</title>
        <meta name="description" content="travel buddy all plans and plan editing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <PlansPage/>
    <Footer/>
    </>
  )
}

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Footer from '@/components/layout/Footer'

export async function getServerSideProps({locale}){

  return{
    props: {
      ...(await serverSideTranslations(locale, [
        "common"
      ])),}
  }
}
 

  