import AttractionsPage from '@/components/pageCompnents/AttractionsPage'
import Head from 'next/head'
import React from 'react'

type Props = {}

const attractions = (props: Props) => {
  return (
<>
<Head>
    <title>Travel Buddy</title>
    <meta name="description" content="travel buddy Attractions add and search" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
<AttractionsPage/>
</>
  )
}

export default attractions


import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common","plan"
      ])),
      // Will be passed to the page component as props
    },
  }
}