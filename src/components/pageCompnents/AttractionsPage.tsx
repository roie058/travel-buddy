import React from 'react'
import { Container, Typography } from '@mui/material'
import { LoadScriptNext } from '@react-google-maps/api'

type Props = {}

const AttractionsPage = (props: Props) => {
  return (
    <>
    <LoadScriptNext googleMapsApiKey={process.env.MAPS_API_KEY} libraries={["places"]}  >
    <Container sx={{marginY:'10%',paddingTop:'65px'}} >
<Typography variant='h1'>Coming soon...</Typography>
   
    </Container>
    </LoadScriptNext>
    </>
  )
}

export default AttractionsPage