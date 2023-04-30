
import Flights from '@/components/pageCompnents/Flights'
import Head from 'next/head'
import Script from 'next/script'
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
  
  <Flights/>
    
    <Script onLoad={() => {
          console.log('Script has loaded')
        }} onError={(e)=>{console.log(e);
        }}    src="https://widgets.skyscanner.net/widget-server/js/loader.js" defer={false} strategy="lazyOnload" async  ></Script>
    </>
  )
}

export default flights