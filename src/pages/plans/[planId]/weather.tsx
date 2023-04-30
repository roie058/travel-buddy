
import PlanFlights from '@/components/pageCompnents/PlanFlights'

import Head from 'next/head'
import React from 'react'

type Props = {}

const weather = (props: Props) => {
    return (
        <>
        <Head>
        <title>Travel Buddy</title>
        <meta name="description" content="travel buddy weather" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      
       <PlanFlights/>

        </>
      )
}

export default weather