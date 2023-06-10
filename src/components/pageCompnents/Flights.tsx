import FlightAdd from '@/components/flights/FlightAdd'
import MyFlights from '@/components/flights/MyFlights'
import SkyScanner from '@/components/flights/SkyScanner'
import { NewSesstion } from '@/pages/api/auth/signup'
import { getPlans } from '@/util/fetchers'
import { CircularProgress, Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import { useSession } from 'next-auth/react'

import React from 'react'

type Props = {}


const Flights = (props: Props) => {

  const {data:session,}=useSession()
  const newSession:NewSesstion={...session}
 const {data:plans,isLoading}=useQuery({queryKey:["plans"],queryFn:()=>getPlans(newSession),enabled:!!session})
 
   
  return (
    <>

    <main style={{width:'100%',justifyContent:'normal'}}>
    {isLoading ? <CircularProgress size={"3rem"} />:  <Grid width={'100%'} container justifyContent={"space-evenly"} >
        
      <Grid item container xs={12} sm={12} md={6}  lg={8} >
      
        
       <Grid item  xs={12} > <FlightAdd plans={plans} /></Grid>
        <Grid item xs={12} > <SkyScanner/></Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} >
        <MyFlights plans={plans} />
        </Grid>
        
       
   </Grid>}
    </main>
   </>)
}

export default Flights