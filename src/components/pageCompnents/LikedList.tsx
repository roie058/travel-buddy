
import { NewSesstion } from '@/pages/api/auth/signup'
import { Box, Card, CircularProgress, Container, Dialog, List, ListItem, ListItemAvatar, ListItemButton, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'

import { useSession } from 'next-auth/react'

import React, {  useState } from 'react'
import { IPlace } from '@/dummyData'
import Image from 'next/image'
import DeleteIcon from '../../../public/images/delete.svg'
import PlaceItemDetailCard from '../ui/calender/PlaceItemDetailCard'
import AttractionSearch from '../attractions/AttractionSearch'
import { LoadScriptNext } from '@react-google-maps/api'
import useSnackBar from '@/hooks/useSnackBar'
import SnackBar from '../ui/SnackBar'
import { useTranslation } from 'next-i18next'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getPlanById, removePlace } from '@/util/fetchers'
import { Plan } from './Schedule'
type Props = {planId:string}

const LikedList = (props: Props) => {
    const [open, setOpen] = useState(false)
    const [viewedPlace, setViewedPlace] = useState<IPlace>()
    const [category, setCategory] = useState<"all"|"restaurants"|'hotels'|'attractions'>('all')
    const [list, setList] = useState<IPlace[]>()
    const {t}=useTranslation("allLiked")
const {setSnackBar,snackBarProps}=useSnackBar()

const {data:session}=useSession()
const newSession:NewSesstion={...session}

const {isLoading,data:plan,refetch}=useQuery(["plan",props.planId,"liked"],()=>(getPlanById(newSession,props.planId)).then((value:Plan)=> {setList(Object.values(value.liked).flat());   return value.liked} ),{enabled:!!session})

const {mutate}=useMutation(removePlace,{
  onMutate:({place})=>{
    setList(()=> list.filter((indexPlace)=>indexPlace.location_id!==place.location_id))
  },
  onSuccess:()=>{
  setSnackBar(t("snack.remove"),"error")
refetch()
},
onError:()=>{
  setSnackBar(t("snack.serverError"),"error")
  refetch()
}

})

    const deletetHandler=async (place:IPlace)=>{
      mutate({place,planId:props.planId,category:(place.category?.key??'hotel')+'s'})
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

<Typography fontSize={"3rem"} variant='h1'>{t("listHeader")}</Typography>
<Select fullWidth   defaultValue={category} onChange={changeHandler}>
    <MenuItem value="all" >{t("categories.all")}</MenuItem>
    <MenuItem value="restaurants">{t("categories.restaurants")}</MenuItem>
    <MenuItem value="hotels" >{t("categories.hotels")}</MenuItem>
    <MenuItem value="attractions">{t("categories.attractions")}</MenuItem>
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
<ListItemButton onClick={()=>{ setOpen(true);setViewedPlace(place)}} sx={{border:'1px solid lightgray',borderRadius:'50px',maxHeight:'50px'}} >{t("view")}</ListItemButton>
       {isLoading? <CircularProgress/> :<ListItemButton onClick={()=>deletetHandler(place)} sx={{display:'flex',justifyContent:'center',borderRadius:'50px',maxHeight:'50px'}}><Image alt='delete' height={20} src={DeleteIcon}/> </ListItemButton>}
</Box>
    </Box>   

    </ListItem>)):<CircularProgress/>}

</List>
</Box>
</Card>
    </Container>
<SnackBar {...snackBarProps}/>
    </>
  )
}

export default LikedList