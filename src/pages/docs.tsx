
import DocsPage from '@/components/pageCompnents/DocsPage'
import Head from 'next/head'
import React from 'react'

type Props = {}

const docs = (props: Props) => {
  return (
    <>
   <Head>
    <title>Travel Buddy | docs</title>
    <meta name="description" content="travel buddy how to use guide and coomon questions" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
    <main>
 <DocsPage/>
    </main>
   </>
  )
}

export default docs