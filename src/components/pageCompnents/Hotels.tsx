import HotelAdd from '@/components/hotels/HotelAdd'
import ReservationList from '@/components/hotels/ReservationList'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'


import { useSession } from 'next-auth/react'

import { NewSesstion } from '@/pages/api/auth/signup'
import { useQuery } from '@tanstack/react-query'
import { getPlanById } from '@/util/fetchers'



type Props = {}

const Hotels = (props: Props) => {


    const {query}=useRouter()

      const {data:session}=useSession()
      const newSession:NewSesstion={...session}
    
const {data:plan,isLoading}=useQuery(["plan",query.planId],()=>getPlanById(newSession,String(query.planId)),{enabled:!!session})
     
    return (
        <>

        <main style={{width:'100%',justifyContent:'normal',alignContent:"normal"}}>
          <Grid width={'100%'} container  >
            
          <Grid item container xs={12} sm={12} md={6}  lg={8} >
          
           {!isLoading&& plan&& <Grid item  xs={12} >
           {/* <LoadScriptNext googleMapsApiKey={process.env.MAPS_API_KEY} libraries={["places"]}  >
            <SearchHotels likedList={plan.liked.hotels}/>
            </LoadScriptNext> */}
             <HotelAdd plan={plan} />
           </Grid>}
            
            </Grid>
            <Grid item  xs={12} sm={12} md={6} lg={4} >
            {!isLoading&& plan&& <ReservationList plan={plan}/>}
            </Grid>
            
           
       </Grid>
        </main>
        </>
      )
    }
  


export default Hotels