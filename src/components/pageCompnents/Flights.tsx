import FlightAdd from '@/components/flights/FlightAdd'
import MyFlights from '@/components/flights/MyFlights'
import SkyScanner from '@/components/flights/SkyScanner'
import { NewSesstion } from '@/pages/api/auth/signup'
import { CircularProgress, Grid } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'

import React, { useEffect, useState } from 'react'

type Props = {}


const Flights = (props: Props) => {
  const [plans, setPlans] = useState<undefined|Array<any>>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const {data:session,}=useSession()
  
 
 
    useEffect(() => {
      const getPlans=async ()=>{
        const newSession:NewSesstion={...session}
       try {
         setIsLoading(true)
       const {data} =await axios.get('/api/plan/getPlans',{params:{userId:newSession.user?.id}})
       if(data.success){
         setPlans(data.plans)
         
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
   </>)
}

export default Flights