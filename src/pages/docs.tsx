
import DocsPage from '@/components/pageCompnents/DocsPage'
import Head from 'next/head'
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
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
 <DocsPage />
    </main>
   </>
  )
}

export default docs

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'docs',"common"
      ])),
      // Will be passed to the page component as props
    },
  }
}