import FlightAdd from '@/components/flights/FlightAdd'
import MyFlights from '@/components/flights/MyFlights'
import SkyScanner from '@/components/flights/SkyScanner'
import { CircularProgress, Grid } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'

type Props = {}


const flights = (props: Props) => {
  const [plans, setPlans] = useState<undefined|Array<any>>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const {data:session,}=useSession()
  
  const id= {userId:session?.user?.id} 
    useEffect(() => {
      const getPlans=async ()=>{
       
       try {
         setIsLoading(true)
       const {data} =await axios.get('/api/plan/getPlans',{params:{userId:id.userId}})
       if(data.success){
         setPlans(data.plans)
         console.log(data.plans);
         
       }
       } catch (error) {
         if(error instanceof AxiosError){
           const errorMsg=error.response?.data?.error
           console.log(errorMsg);
           
         }
       }
     setIsLoading(false)
      }
      if(session){
        getPlans()
      }},[session])
  
  
  return (
    <>
    <Head>
    <title>Travel Buddy</title>
    <meta name="description" content="travel buddy flights add and search" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    <Script src="https://widgets.skyscanner.net/widget-server/js/loader.js" async ></Script>
  </Head>
  
    <main style={{width:'100%',justifyContent:'normal'}}>
    {isLoading ? <CircularProgress size={"10wv"} sx={{padding:'0 40%'}}/>:  <Grid width={'100%'} container justifyContent={"space-evenly"} >
        
      <Grid item container xs={12} sm={12} md={6}  lg={8} >
      
        
       <Grid item  xs={12} > <FlightAdd plans={plans} /></Grid>
        <Grid item xs={12} ><SkyScanner/></Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} >
        <MyFlights plans={plans} />
        </Grid>
        
       
   </Grid>}
    </main>
    <Script onLoad={() => {
          console.log('Script has loaded')
        }} onError={(e)=>{console.log(e);
        }}    src="https://widgets.skyscanner.net/widget-server/js/loader.js" defer={false} strategy="lazyOnload" async  ></Script>
    </>
  )
}

export default flights