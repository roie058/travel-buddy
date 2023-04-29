import FlightAdd from '@/components/flights/FlightAdd'
import MyFlights from '@/components/flights/MyFlights'
import { Grid } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'
import { Plan } from './schedule'

type Props = {}


const flights = (props: Props) => {
  const{ query}=useRouter()

  const [list,setList ] =useState<Plan>()
const [isLoading,setIsLoading]=useState(false)
  const {data:session}=useSession()
const id= {userId:session?.user?.id} 
  useEffect(() => {
    const getPlan=async ()=>{
     
     try {
       setIsLoading(true)
     const {data} =await axios.get('/api/plan/getPlan',{params:{userId:id.userId,planId:query.planId}})
     if(data.success){
       setList(data.plan)
       console.log(data.plan);
       
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
      getPlan()
    }

   }, [session])




  return (
    <>
    <Head>
    <title>Travel Buddy</title>
    <meta name="description" content="travel buddy flights add and search" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    <Script src="https://widgets.skyscanner.net/widget-server/js/loader.js" async ></Script>
  </Head>
  
    <main style={{width:'100%',justifyContent:'normal',alignContent:"normal"}}>
      <Grid width={'100%'} container  >
        
      <Grid item container xs={12} sm={12} md={6}  lg={8} >
      
        <Grid item  xs={12} > <FlightAdd plan={list} /></Grid>
        
        </Grid>
        <Grid item  xs={12} sm={12} md={6} lg={4} >
        <MyFlights plan={list} />
        </Grid>
        
       
   </Grid>
    </main>
    </>
  )
}

export default flights