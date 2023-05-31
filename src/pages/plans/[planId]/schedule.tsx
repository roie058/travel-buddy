
import Schedule from '@/components/pageCompnents/Schedule'

import Head from 'next/head'

import React from 'react'


type Props = {}








const schedule = (props: Props) => {

  return (<>
    <Head>
        <title>Travel Buddy</title>
        <meta name="description" content="travel buddy plan schedule and day routes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Schedule/>
      </>
  )
}

export default schedule

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common","plan","day"
      ])),
      // Will be passed to the page component as props
    },
  }
}