import FlightAdd from '@/components/flights/FlightAdd'
import MyFlights from '@/components/flights/MyFlights'

import { Grid } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Plan } from './Schedule'
import { NewSesstion } from '@/pages/api/auth/signup'



type Props = {}


const PlanFlights = (props: Props) => {
  const{ query}=useRouter()

  const [list,setList ] =useState<Plan>()
const [isLoading,setIsLoading]=useState(false)

  const {data:session}=useSession()
const newSession:NewSesstion={...session}
  useEffect(() => {
    const getPlan=async ()=>{
     
     try {
       setIsLoading(true)
     const {data} =await axios.get('/api/plan/getPlan',{params:{userId:newSession.user?.id,planId:query.planId}})
     if(data.success){
       setList(data.plan)
  
       
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

   }, [session,query.planId])




  return (
    <>

  
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

export default PlanFlights