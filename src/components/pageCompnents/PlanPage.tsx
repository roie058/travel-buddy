import BudgetBoard from '@/components/dash/BudgetBoard'
import DashBtns from '@/components/dash/DashBtns'

import { CircularProgress, Grid, useMediaQuery } from '@mui/material'
import { useSession } from 'next-auth/react'

import React from 'react'

import { NewSesstion } from '@/pages/api/auth/signup'
import { LoadScriptNext } from '@react-google-maps/api'
import {useQuery} from '@tanstack/react-query'
import { getPlanById } from '@/util/fetchers'

type Props = {query:{planId:string}}

const libraries:("geometry" | "drawing" | "places" | "localContext" | "visualization")[] =['geometry', 'drawing', 'places']
const PlanPage = (props: Props) => {
  const{planId}=props.query
  const {data:session}=useSession()

  const newSession:NewSesstion={...session}

const {isLoading,data:list}=useQuery(["plan",planId],()=>getPlanById(newSession,planId),{enabled:!!session})
   

const isMobile=useMediaQuery("(max-width:900px)")

  return (
    <>
      
    {isLoading ? <CircularProgress sx={{padding:'20% 40%'}} size={'10vw'}/> :
    <main style={{justifyContent:'normal',height:'100%'}}>
    <Grid justifyContent={"center"}    columnGap={1} rowGap={1}   container >
        <Grid md={5.5} sm={10} xs={11} item order={isMobile?2:1} >
        {list&&<BudgetBoard plan={list}/> }
        </Grid>
    <Grid md={5.5} sm={10} xs={11} display="flex"  order={isMobile?1:2}   flexDirection={'column'} gap="10px" item>
    { <LoadScriptNext googleMapsApiKey={`${process.env.MAPS_API_KEY}`} libraries={libraries}> 
<DashBtns plan={list}/>
</LoadScriptNext> }
</Grid>
</Grid>
    </main>
    }
   
  </>
  )
}

export default PlanPage