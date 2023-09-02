import React from 'react'
import Footer from '@/components/layout/Footer'
import Head from 'next/head'
import SuprisePlanForm from '@/components/newPlan/SuprisePlanForm'
type Props = {}

const ai = (props: Props) => {
  return (
    <>
    <Head>
        <title>Travel Buddy | New Plan AI</title>
        <meta name="description" content="travel buddy AI will help you find the right destination of your next trip" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
   
    <div>
  <SuprisePlanForm/> 
 <Footer/>
    </div>
    </>
   
  )
}

export default ai

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