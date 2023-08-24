import { Box, Button, ButtonGroup, Card, CardHeader, Typography } from '@mui/material'

import React, { useState } from 'react'
import SuprisePlanForm from './SuprisePlanForm'

type Props = {setIsForm}

const BeforePrompt = (props: Props) => {
  const [isHelp,setIsHelp]=useState(false)
  return (
    <>

   {!isHelp? <Box sx={{height:"calc(100vh - 60px)"}} textAlign={"center"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
      <Typography variant="h1" fontSize={"3rem"}  >Where are we going?</Typography>
<ButtonGroup  variant="contained" sx={{margin:"5%"}} >
<Button onClick={()=> props.setIsForm(true)}  sx={{textTransform:"capitalize"}} >I already know</Button>
<Button onClick={()=> setIsHelp(true)}  variant="outlined" sx={{textTransform:"capitalize"}} >Help me</Button>
</ButtonGroup>


    </Box>:
    <SuprisePlanForm/>
  }
    </>
  )
}

export default BeforePrompt