
import ForgetPass from '@/components/form/ForgetPass'
import React from 'react'

type Props = {}

const passwordForget = (props: Props) => {
  return (
    <div>
    <ForgetPass/>
    </div>
  )
}

export default passwordForget

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