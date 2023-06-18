import { Box,Typography } from '@mui/material'
import React from 'react'
import { TFunction } from 'i18next'
import {Heebo} from 'next/font/google'

type Props = {t: TFunction<"home", undefined, "home">}

import Link from 'next/link'
import { useRouter } from 'next/router'
const heebo=Heebo({subsets:["latin","hebrew"]})
const GuideLink = ({t}:Props) => {
  const {locale}=useRouter()

  return (
      <Box minHeight={"40vh"}    >
        <Box height={"100%"}  display={'flex'} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} px={'10%'}  >
        
<Box display={'flex'}  flexDirection={"column"} >
<Typography textAlign={"center"} className={heebo.className} variant='h3' fontWeight={"bold"} >{t('docs.header')}</Typography>
<Typography textAlign={"center"} className={heebo.className} variant='body1'>{t('docs.sub')}</Typography>
    <Link className={heebo.className}  href={'/docs'}><Typography textAlign={"center"}>{t('docs.link')}</Typography></Link>


</Box>
</Box>

    </Box>
  )
}

export default GuideLink