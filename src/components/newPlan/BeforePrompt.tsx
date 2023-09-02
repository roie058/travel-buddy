import { Box, Button, ButtonGroup, Card, CardHeader, Typography } from '@mui/material'

import React from 'react'
import {useRouter} from 'next/router'
import { useTranslation } from 'react-i18next'
type Props = {}

const BeforePrompt = (props: Props) => {
const {t}=useTranslation()
  const router=useRouter()
  return (
    <>

    <Box sx={{height:"calc(100vh - 60px)"}} textAlign={"center"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
      <Typography variant="h1" fontSize={"3rem"}  >Where are we going?</Typography>
<ButtonGroup  variant="contained" sx={{margin:"5%"}} >
<Button onClick={()=> router.push('/newplan/form')}  sx={{textTransform:"capitalize"}} >I already know</Button>
<Button onClick={()=> router.push('/newplan/ai')}  variant="outlined" sx={{textTransform:"capitalize"}} >Help me</Button>
</ButtonGroup>
    </Box>
    </>
  )
}

export default BeforePrompt