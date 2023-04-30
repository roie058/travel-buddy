import Head from 'next/head'

import HomePage from '@/components/pageCompnents/HomePgae'





export default function Home() {

  return (
    <>
      <Head>
        <title>Travel Buddy</title>
        <meta name="description" content="travel buddy home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <HomePage/>
    </>
  )
}
