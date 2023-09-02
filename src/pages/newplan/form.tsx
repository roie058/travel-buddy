import React from 'react'
import Footer from '@/components/layout/Footer'
import NewPlanForm from '@/components/newPlan/NewPlanForm'
import Head from 'next/head'
type Props = {}

const form = (props: Props) => {
  return (
    <>
     <Head>
        <title>Travel Buddy | New Plan Form</title>
        <meta name="description" content="travel buddy create a new plan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div>
  <NewPlanForm/> 
 <Footer/>
    </div>
    </>
  )
}

export default form

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