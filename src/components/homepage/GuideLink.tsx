import { Box,Typography } from '@mui/material'
import React from 'react'

type Props = {}
import {Heebo} from 'next/font/google'


import Link from 'next/link'
const heebo=Heebo({subsets:["latin","hebrew"]})
const GuideLink = (props: Props) => {


  return (
      <Box minHeight={"40vh"}    >
        <Box height={"100%"}  display={'flex'} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} px={'10%'}  >
        
<Box display={'flex'}  flexDirection={"column"} >
<Typography className={heebo.className} variant='h3' fontWeight={"bold"} >Feeling confused?</Typography>
<Typography className={heebo.className} variant='body1'>check our docs, we explain the basics and address commonly asked questions</Typography>
    <Link className={heebo.className} href={'/docs'}>View Documentation</Link>


</Box>
</Box>

    </Box>
  )
}

export default GuideLink