import HotelAdd from '@/components/hotels/HotelAdd'
import ReservationList from '@/components/hotels/ReservationList'
import { Grid } from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, {  useEffect, useState } from 'react'

import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { Plan } from './schedule'

type Props = {}

const hotels = (props: Props) => {


    const {query}=useRouter()

    const [plan, setPlan] = useState<Plan>()
    const [isLoading,setIsLoading]=useState(false)
      const {data:session}=useSession()

    const id= {userId:session?.user?.id} 

      useEffect(() => {
        const getPlan=async ()=>{
         
         try {
           setIsLoading(true)
         const {data} =await axios.get('/api/plan/getPlan',{params:{userId:id.userId,planId:query.planId}})
         if(data.success){
           setPlan(data.plan)
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
        <meta name="description" content="travel buddy hotel add and search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      
        <main style={{width:'100%',justifyContent:'normal',alignContent:"normal"}}>
          <Grid width={'100%'} container  >
            
          <Grid item container xs={12} sm={12} md={6}  lg={8} >
          
           {!isLoading&& plan&& <Grid item  xs={12} > <HotelAdd plan={plan} /></Grid>}
            
            </Grid>
            <Grid item  xs={12} sm={12} md={6} lg={4} >
            {!isLoading&& plan&& <ReservationList plan={plan}/>}
            </Grid>
            
           
       </Grid>
        </main>
        </>
      )
    }
  


export default hotels