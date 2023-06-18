import { Box } from '@mui/material'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <Box display={"flex"} bgcolor={"#FAFAFA"} justifyContent={"center"} textAlign={"center"} width={"100%"}>
      &copy;Travelbuddy 2023 All Rights Reserved
    </Box>
  )
}

export default Footer