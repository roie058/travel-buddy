import Head from 'next/head'

import HomePage from '@/components/pageCompnents/HomePgae'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Footer from '@/components/layout/Footer'



export default function Home() {
  const { t } = useTranslation('home')
  
  return (
    <>
      <Head>
        <title>Travel Buddy</title>
        <meta name="description" content="travel buddy home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <HomePage t={t}/>
    <Footer/>
    </>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'home',"common"
      ])),
      // Will be passed to the page component as props
    },
  }
}