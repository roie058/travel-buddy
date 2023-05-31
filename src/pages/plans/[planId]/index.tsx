
import React from 'react'

import Head from 'next/head'
import PlanPage from '@/components/pageCompnents/PlanPage'

type Props = {}


const dashboard = (props: Props) => {


  return (
    <>
   <Head>
        <title>Travel Buddy</title>
        <meta name="description" content="travel buddy plan dashboard and budget control" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
 <PlanPage/>
  </>
  )
}

export default dashboard

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common","plan","form"
      ])),
      // Will be passed to the page component as props
    },
  }
}