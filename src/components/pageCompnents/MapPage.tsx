
import Map from '@/components/map/Map'
import List from '@/components/ui/list/List'
import { UserContext } from '@/context/auth-context'
import { MapContext } from '@/context/map-context'
import { IPlace } from '@/dummyData'


import { Grid, useMediaQuery } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'


import { useEffect, useRef, useState } from 'react'
import { Plan } from './Schedule'
import { NewSesstion } from '@/pages/api/auth/signup'
import { LoadScriptNext } from '@react-google-maps/api'


const libraries:("geometry" | "drawing" | "places" | "localContext" | "visualization")[] =['places']

export default function MapPage() {
  const [placeList ,setPlaceList] = useState<any[]|IPlace[]>([])
  const [filteredPlaces ,setFilteredPlaces] = useState<any[]|IPlace[]>([])
  const [coordinates ,setCoordinates] = useState<{lat:number,lng:number}|undefined>()
  const [bounds ,setBounds] = useState<any>({})
  const [childClicked, setChildClicked] = useState(null)
  const mapRef = useRef<any>()
  const [rating, setRating] = useState("0")
  const [type, setType] = useState<'hotels'|'restaurants'|'attractions'>("hotels")
  const [isLoading, setIsLoading] = useState(false)
  
  const [plans,setPlans]=useState<Plan[]|any[]>([])
const {data:session}=useSession()
const newSession:NewSesstion={...session}
  useEffect(() => {
    const getPlans=async ()=>{
     
     try {
       setIsLoading(true)
     const {data} =await axios.get('/api/plan/getPlans',{params:{userId:newSession.user?.id,populate:true}})
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
  },[rating,placeList])
  let allLikedList:IPlace[];
  let likedIds=new Set(['']);

    if(plans){
      allLikedList=plans.flatMap((plan:Plan)=> [...plan.liked.restaurants,...plan.liked.attractions,...plan.liked.hotels])
      likedIds=new Set(allLikedList?.map((place:IPlace)=>place.name+place.location_id));
   }






const isMobile=useMediaQuery('(min-width:800px)')
const isSm=useMediaQuery('(min-width:600px)')

  
return (
    <>  
      <LoadScriptNext  googleMapsApiKey={`${process.env.MAPS_API_KEY}`}
  libraries={libraries}> 
      <MapContext.Provider value={{
    setPlaceList,placeList:filteredPlaces.length?filteredPlaces:placeList,
    setBounds,bounds,
    setChildClicked,childClicked,
    setCoordinates,coordinates,
    setIsLoading,isLoading,
    type,setType,
    rating,
    setRating,
    mapRef:mapRef,
   }}>
    <UserContext.Provider value={{plans,userId:newSession.user?.id??''}}>
     <Grid sx={{backgroundColor:'#FAFAFA',minHeight:"calc(100vh - 54px)",marginLeft:'0'}}  container >
      <Grid    item xs={12}  lg={8} sm={isMobile?7:12} md={7}>
        <Map plans={plans} likedIds={likedIds}  likedList={allLikedList} />
        </Grid>
      <Grid display={isMobile?'block':"none"}  item lg={4} md={5} sm={isMobile?5:12} xs={12}>
        <List likedIds={likedIds}  />
        </Grid> 
      </Grid>
      </UserContext.Provider>
      </MapContext.Provider>
       </LoadScriptNext> 
    </>
  )
}