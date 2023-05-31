import { Box,Typography } from '@mui/material'
import React from 'react'
import { TFunction } from 'i18next'
import {Heebo} from 'next/font/google'

type Props = {t: TFunction<"home", undefined, "home">}

import Link from 'next/link'
const heebo=Heebo({subsets:["latin","hebrew"]})
const GuideLink = ({t}:Props) => {


  return (
      <Box minHeight={"40vh"}    >
        <Box height={"100%"}  display={'flex'} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} px={'10%'}  >
        
<Box display={'flex'}  flexDirection={"column"} >
<Typography className={heebo.className} variant='h3' fontWeight={"bold"} >{t('docs.header')}</Typography>
<Typography className={heebo.className} variant='body1'>{t('docs.sub')}</Typography>
    <Link className={heebo.className} href={'/docs'}>{t('docs.link')}</Link>


</Box>
</Box>

    </Box>
  )
}

export default GuideLink