
import { NewSesstion } from '@/pages/api/auth/signup'
import { Box, Card, CircularProgress, Container, Dialog, List, ListItem, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { IPlace } from '@/dummyData'
import Image from 'next/image'
import DeleteIcon from '../../../public/images/delete.svg'
import PlaceItemDetailCard from '../ui/calender/PlaceItemDetailCard'
import AttractionSearch from '../attractions/AttractionSearch'
import { LoadScriptNext } from '@react-google-maps/api'
type Props = {}

const LikedList = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [viewedPlace, setViewedPlace] = useState<IPlace>()
    const [category, setCategory] = useState<"all"|"restaurants"|'hotels'|'attractions'>('all')
    const [plan, setPlan] = useState<{restaurants:IPlace[],hotels:IPlace[],attractions:IPlace[]}>()
    const [list, setList] = useState<IPlace[]>()

const {query}=useRouter()
const {data:session}=useSession()

useEffect(() => {
    const getPlan=async ()=>{
      const newSession:NewSesstion={...session}
     try {
       setIsLoading(true)
     const {data} =await axios.get('/api/plan/getPlan',{params:{userId:newSession.user?.id,planId:query.planId}})
     if(data.success){
        const liked:{restaurants:IPlace[],hotels:IPlace[],attractions:IPlace[]}=data.plan.liked
       setPlan(liked)

setList(Object.values(liked).flat())    
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


   const deletetHandler=async (place:IPlace)=>{
    try {
      setIsLoading(true)
      const {data} = await axios.patch('/api/place/newPlace',{place:place,category:(place.category?.key??'hotel')+'s',planId:query.planId})
      if(data.success){
     setList(()=> list.filter((indexPlace)=>indexPlace.location_id!==place.location_id))
      }else{
        console.log(data.error); 
      }
      
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  }

const onClose=()=>{
    setOpen(false)
}


 const  changeHandler:(event: SelectChangeEvent<"all" | "restaurants" | "hotels" | "attractions">, child: React.ReactNode) => void = (e)=>{
e.preventDefault()
 const selectedCategory=e.target.value;
if(selectedCategory==="all"){
   setList(Object.values(plan).flat())
}else{
    setList(plan[selectedCategory])
}

}

 

  return (
    <>
        
    <Dialog open={open} onClose={onClose} >
<Box>
<PlaceItemDetailCard place={viewedPlace}/>
</Box>
    </Dialog>
    <Container sx={{marginY:'5%',paddingTop:'65px',display:'flex',flexDirection:'column',gap:'15px'}}   >
    <LoadScriptNext googleMapsApiKey={process.env.MAPS_API_KEY} libraries={["places"]}  >
     {list&& <AttractionSearch setList={setList} likedList={list}/>}
     </LoadScriptNext>
<Card elevation={3} >
<Box  padding={'5%'}  >

<Typography fontSize={"3rem"} variant='h1'>Liked Places</Typography>
<Select fullWidth   defaultValue={category} onChange={changeHandler}>
    <MenuItem value="all" >All</MenuItem>
    <MenuItem value="restaurants">Restaurants</MenuItem>
    <MenuItem value="hotels" >Hotels</MenuItem>
    <MenuItem value="attractions">Attractions</MenuItem>
</Select>
<List>

{list?list.map((place)=>(<ListItem key={place._id} >
    <ListItemAvatar >
        <Image alt={place.name}   width={75} height={75} src={place.photo.images.small.url??'/images/placeholder.png'}/>
    </ListItemAvatar>
 <Box sx={{display:'flex',justifyContent:'space-between',width:'100%',flexWrap:"wrap",gap:'3px'}}>
    <Box marginLeft={"2%"}>
        <Typography fontWeight={"bold"}>{place.name}</Typography>
        <Typography color={"GrayText"} textTransform={"capitalize"} >{place.category?.key??'Hotel'}</Typography>
    </Box>
<Box display={"flex"} alignItems={"center"}>
<ListItemButton onClick={()=>{ setOpen(true);setViewedPlace(place)}} sx={{border:'1px solid lightgray',borderRadius:'50px',maxHeight:'50px'}} >View</ListItemButton>
       {isLoading? <CircularProgress/> :<ListItemButton onClick={()=>deletetHandler(place)} sx={{display:'flex',justifyContent:'center',borderRadius:'50px',maxHeight:'50px'}}><Image alt='delete' height={20} src={DeleteIcon}/> </ListItemButton>}
</Box>
    </Box>   

    </ListItem>)):<CircularProgress/>}

</List>
</Box>
</Card>
    </Container>

    </>
  )
}

export default LikedList