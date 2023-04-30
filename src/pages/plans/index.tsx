


import PlansPage from '@/components/pageCompnents/PlansPage'
import Head from 'next/head'




export default function Plan() {



  return (
    <>
      <Head>
        <title>Travel Buddy</title>
        <meta name="description" content="travel buddy all plans and plan editing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <PlansPage/>
    </>
  )
}