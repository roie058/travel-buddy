import { Grid } from '@mui/material'
import Head from 'next/head'
import React from 'react'

type Props = {}

const weather = (props: Props) => {
    return (
        <>
        <Head>
        <title>Travel Buddy</title>
        <meta name="description" content="travel buddy weather" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      
        <main style={{width:'100%',justifyContent:'normal',alignContent:"normal"}}>
          <Grid width={'100%'} container  >
            
          <Grid item container xs={12} sm={12} md={6}  lg={8} >
          
            <Grid item  xs={12} > <FlightAdd/></Grid>
            
            </Grid>
            <Grid item  xs={12} sm={12} md={6} lg={4} >
            <MyFlights />
            </Grid>
            
           
       </Grid>
        </main>
        </>
      )
}

export default weather