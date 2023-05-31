import NewCreatePlan from '@/components/form/NewCreatePlan'
import React from 'react'

type Props = {}

const newplan = (props: Props) => {
  return (
    <div>
 <NewCreatePlan/>
    </div>
   
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