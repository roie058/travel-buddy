import Auth from '@/components/form/Auth'
import React from 'react'

type Props = {}

const auth = (props: Props) => {
  return (
    <div>
    <Auth />
    <Footer/>
    </div>
  )
}

export default auth

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Footer from '@/components/layout/Footer'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'auth',"common"
      ])),
      // Will be passed to the page component as props
    },
  }
}