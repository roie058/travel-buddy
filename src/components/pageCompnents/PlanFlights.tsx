import FlightAdd from '@/components/flights/FlightAdd'
import MyFlights from '@/components/flights/MyFlights'

import { CircularProgress, Grid } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Plan } from './Schedule'
import { NewSesstion } from '@/pages/api/auth/signup'
import { useQuery } from '@tanstack/react-query'
import { getPlanById } from '@/util/fetchers'



type Props = {}


const PlanFlights = (props: Props) => {
  const{ query}=useRouter()

  //const [list,setList ] =useState<Plan>()
//const [isLoading,setIsLoading]=useState(false)

  const {data:session}=useSession()
const newSession:NewSesstion={...session}

const {data:list,isLoading}=useQuery({queryKey:["plan",query.planId],queryFn:()=>getPlanById(newSession,String(query.planId)),enabled:!!session})


  return (
    <>

  
 <main style={{width:'100%',justifyContent:'normal',alignContent:"normal"}}>
 {isLoading?<CircularProgress size={"2rem"}/>:   <Grid width={'100%'} container  >
        
      <Grid item container xs={12} sm={12} md={6}  lg={8} >
      
        <Grid item  xs={12} > <FlightAdd plan={list} /></Grid>
        
        </Grid>
        <Grid item  xs={12} sm={12} md={6} lg={4} >
        <MyFlights plan={list} />
        </Grid>
        
       
   </Grid>}
    </main>
    </>
  )
}

export default PlanFlights