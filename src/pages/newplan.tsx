import NewCreatePlan from '@/components/form/NewCreatePlan'
import React from 'react'

type Props = {}

const newplan = (props: Props) => {
  return (
    <div>
 <NewCreatePlan/>
 <Footer/>
    </div>
   
  )
}

export default newplan

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Footer from '@/components/layout/Footer'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common","form"
      ])),
      // Will be passed to the page component as props
    },
  }
}