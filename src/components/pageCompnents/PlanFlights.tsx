import FlightAdd from '@/components/flights/FlightAdd'
import MyFlights from '@/components/flights/MyFlights'

import { Box, CircularProgress, Grid } from '@mui/material'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

import { NewSesstion } from '@/pages/api/auth/signup'
import { useQuery } from '@tanstack/react-query'
import { getPlanById } from '@/util/fetchers'
import FlightSearch from '../flights/FlightSearch'
import ButtonModalWrapper from '../ui/ButtonModalWrapper'
import { AddIcon, PlaneIcon } from '../svgComponents'



type Props = {}


const PlanFlights = (props: Props) => {
  const{ query}=useRouter()

  const {data:session}=useSession()
const newSession:NewSesstion={...session}

const {data:list,isLoading}=useQuery({queryKey:["plan",query.planId],queryFn:()=>getPlanById(newSession,String(query.planId)),enabled:!!session})


  return (
    <>

  
 <main style={{width:'100%',justifyContent:'normal',alignContent:"normal"}}>
 {isLoading?<CircularProgress size={"2rem"}/>:   
 <Grid width={'100%'} container  >
        
        <Grid item  xs={12}   >
        <Box sx={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:"20px",paddingTop:"5%",marginX:"10%"}}>
      <ButtonModalWrapper color='linear-gradient(51deg, rgba(0,194,202,1) 0%, rgba(55,193,199,1) 100%)' icon={<PlaneIcon width={30} height={30} fill='#fff'/>}><MyFlights plan={list} /></ButtonModalWrapper>
          <ButtonModalWrapper color='linear-gradient(51deg, rgba(3,59,136,1) 0%, rgba(0,109,209,1) 100%)' icon={<AddIcon width={30} height={30}  />}><FlightAdd plan={list} /></ButtonModalWrapper>
          </Box>
      <FlightSearch plan={list}/>
    
      </Grid>    
   </Grid>
   }
    </main>
    </>
  )
}

export default PlanFlights