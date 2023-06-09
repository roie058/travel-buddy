
import PlanFlights from '@/components/pageCompnents/PlanFlights'
import Head from 'next/head'

import React from 'react'


type Props = {}


const flights = (props: Props) => {

  return (
    <>
    <Head>
    <title>Travel Buddy</title>
    <meta name="description" content="travel buddy flights add and search" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <PlanFlights/>
  
    </>
  )
}

export default flights

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common","flights"
      ])),
      // Will be passed to the page component as props
    },
  }
}