
import Map from '@/components/map/Map'
import List from '@/components/ui/list/List'
import { UserContext } from '@/context/auth-context'
import { MapContext } from '@/context/map-context'
import { IPlace } from '@/dummyData'

import { Grid, useMediaQuery } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'

import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Plan } from './plans/[planId]/schedule'


export default function map() {
  const [placeList ,setPlaceList] = useState<any[]|IPlace[]>([])
  const [filteredPlaces ,setFilteredPlaces] = useState<any[]|IPlace[]>([])
  const [coordinates ,setCoordinates] = useState<{lat:number,lng:number}|undefined>()
  const [bounds ,setBounds] = useState<any>({})
  const [childClicked, setChildClicked] = useState(null)
  const [rating, setRating] = useState("0")
  const [type, setType] = useState<'hotels'|'restaurants'|'attractions'>("hotels")
  const [isLoading, setIsLoading] = useState(false)
  
  const [plans,setPlans]=useState<Plan[]|any[]>([])
const {data:session}=useSession()
const id= {userId:session?.user?.id} 
  useEffect(() => {
    const getPlans=async ()=>{
     
     try {
       setIsLoading(true)
     const {data} =await axios.get('/api/plan/getPlans',{params:{userId:id.userId,populate:true}})
     if(data.success){
       setPlans(data.plans)
       console.log(data.plans);
       
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
    }

   }, [session])


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
      setCoordinates({lat:latitude,lng:longitude})
    })
  },[])
  
  useEffect(()=>{    
  const filteredPlaces = placeList.filter((place)=>(Number(place.rating)>=Number(rating)))
  setFilteredPlaces(filteredPlaces)
  },[rating])
  let allLikedList;
  let likedIds=new Set(['']);
if(plans){
   allLikedList=plans.flatMap((plan:Plan)=> [...plan.liked.restaurants,...plan.liked.attractions,...plan.liked.hotels])
   likedIds=new Set(allLikedList?.map((place:IPlace)=>place.name+place.location_id));
}



const isMobile=useMediaQuery('(min-width:800px)')

  
return (
    <>
      <Head>
        <title>Travel Buddy</title>
        <meta name="description" content="travel buddy Atraction Map" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <MapContext.Provider value={{
    setPlaceList,placeList:filteredPlaces.length?filteredPlaces:placeList,
    setBounds,bounds,
    setChildClicked,childClicked,
    setCoordinates,coordinates,
    setIsLoading,isLoading,
    type,setType,
    rating,
    setRating
   }}>
    <UserContext.Provider value={{plans,userId:id.userId}}>
     <Grid sx={{backgroundColor:'#FAFAFA',minHeight: "calc(100vh - 57px)",marginTop:'57px',marginLeft:'0'}}  container >
      <Grid    item xs={12}  lg={8} sm={isMobile?7:12} md={7}>
        <Map likedIds={likedIds}  likedList={allLikedList??[]} />
        </Grid>
      <Grid display={isMobile?'block':"none"}  item lg={4} md={5} sm={isMobile?5:12} xs={12}>
        <List likedIds={likedIds}  />
        </Grid> 
      </Grid>
      </UserContext.Provider>
      </MapContext.Provider>
      
    </>
  )
}

