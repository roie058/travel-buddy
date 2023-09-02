import React from 'react'
import Footer from '@/components/layout/Footer'
import BeforePrompt from '@/components/newPlan/BeforePrompt'
import Head from 'next/head'
type Props = {}

const newplan = (props: Props) => {
  return (
    <>
    <Head>
        <title>Travel Buddy | New Plan</title>
        <meta name="description" content="travel buddy create a new plan or let our ai find the right destination for you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div>
  <BeforePrompt/> 
 <Footer/>
    </div>
   </>
  )
}

export default newplan

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'




export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common","form"
      ])),
      // Will be passed to the page component as props
    },
  }
}