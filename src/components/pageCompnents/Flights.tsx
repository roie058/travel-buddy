import FlightAdd from '@/components/flights/FlightAdd'
import MyFlights from '@/components/flights/MyFlights'
import SkyScanner from '@/components/flights/SkyScanner'
import { NewSesstion } from '@/pages/api/auth/signup'
import { getPlans } from '@/util/fetchers'
import { Box, CircularProgress, Grid } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import { useSession } from 'next-auth/react'

import React from 'react'
import ButtonModalWrapper from '../ui/ButtonModalWrapper'
import FlightSearch from '../flights/FlightSearch'
import { AddIcon, PlaneIcon } from '../svgComponents'

type Props = {}


const Flights = (props: Props) => {

  const {data:session,}=useSession()
  const newSession:NewSesstion={...session}
 const {data:plans,isLoading}=useQuery({queryKey:["plans"],queryFn:()=>getPlans(newSession),enabled:!!session})
 
   
  return (
    <>

  
    <main style={{width:'100%',justifyContent:'normal',alignContent:"normal"}}>
    {isLoading?<CircularProgress size={"2rem"}/>:   
    <Grid width={'100%'} container  >
           
           <Grid item  xs={12}   >
           <Box sx={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:"20px",paddingTop:"5%",marginX:"10%"}}>
         <ButtonModalWrapper color='linear-gradient(51deg, rgba(0,194,202,1) 0%, rgba(55,193,199,1) 100%)' icon={<PlaneIcon width={30} height={30} fill='#fff'/>}><MyFlights plans={plans} /></ButtonModalWrapper>
             <ButtonModalWrapper color='linear-gradient(51deg, rgba(3,59,136,1) 0%, rgba(0,109,209,1) 100%)' icon={<AddIcon width={30} height={30}  />}><FlightAdd plans={plans} /></ButtonModalWrapper>
             </Box>
         <FlightSearch plans={plans} />
       
         </Grid>    
      </Grid>
      }
       </main>
       </>)
}

export default Flights