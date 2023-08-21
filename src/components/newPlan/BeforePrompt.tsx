import { Box, Button, ButtonGroup, Card, CardHeader, Typography } from '@mui/material'

import React from 'react'

type Props = {}

const BeforePrompt = (props: Props) => {
  return (
    <Box sx={{height:"calc(100vh - 60px)"}} textAlign={"center"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
      <Typography variant="h1" fontSize={"3rem"}  >Where are we going?</Typography>
<ButtonGroup variant="contained" sx={{marginY:"5%"}} >
<Button >I already know</Button>
<Button disabled >Help me</Button>
</ButtonGroup>

    </Box>
  )
}

export default BeforePrompt