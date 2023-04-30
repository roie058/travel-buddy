
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