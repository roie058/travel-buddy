import Auth from '@/components/form/Auth'
import React from 'react'

type Props = {}

const auth = (props: Props) => {
  return (
    <div>
    <Auth />
    </div>
  )
}

export default auth

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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