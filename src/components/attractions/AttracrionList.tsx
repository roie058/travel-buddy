import React, { useState } from 'react'

import { Box, CircularProgress, Dialog, List, ListItem, ListItemAvatar, ListItemButton, Typography } from '@mui/material'
import { IPlace } from '@/dummyData'
import Image from 'next/image'
import PlaceItemDetailCard from '../ui/calender/PlaceItemDetailCard'
import { useRouter } from 'next/router'
import axios from 'axios'
import { AddedIcon } from '../svgComponents'
import useSnackBar from '@/hooks/useSnackBar'
import SnackBar from '../ui/SnackBar'
import { useTranslation } from 'next-i18next'
import { useMutation } from '@tanstack/react-query'
import { newLikedPlace, newPlace } from '@/util/fetchers'
import { queryClient } from '@/pages/_app'

type Props = {list:IPlace[],likedList:Set<string>,setList:React.Dispatch<React.SetStateAction<IPlace[]>>}

export const getPlaceDetails=async(locationId:string)=>{
  const options = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/attractions/get-details',
    params: {
      location_id: locationId,
      currency: 'USD',
      lang: 'en_US'
    },
    headers: {
      'X-RapidAPI-Key': 'fd4ed84719msh53f53a14ec8af94p16758djsn13642243ed02',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    return response.data;

  } catch (error) {
    console.error(error);
  }

}


const AttracrionList = (props: Props) => {
  const [viewedPlace,setViewedPlace]=useState<IPlace>()
  const [open,setOpen]=useState<boolean>(false)

  const {t}=useTranslation("allLiked")
const {setSnackBar,snackBarProps}=useSnackBar()
  const {query}=useRouter()


const {mutate,isLoading}=useMutation(newLikedPlace,{onSuccess:()=>{
  setSnackBar(t("snack.add"),"success") 
queryClient.invalidateQueries(["plan",query.planId,"liked"])
},
onError:()=>{
  setSnackBar(t("snack.serverError"),"error") 
}

})
    

  const addHandler= async(locationId:string)=>{
    const place:IPlace=await getPlaceDetails(locationId)
    console.log(place);
    
    const categories=new Set(['attractions','hotels','restaurants'])
    mutate({place:place,category:categories.has(`${place?.category?.key??'hotel'}s`)? `${place?.category?.key??'hotel'}s`  : 'attractions',planId:String(query.planId)})
   }
   
   const viewHandler= async(locationId:string)=>{
    console.log(locationId);
    
    if(locationId!==viewedPlace?.location_id){
      const place=await getPlaceDetails(locationId)
      setViewedPlace(place)
    }
     setOpen(true)
    }
   
    const onClose=()=>{
     setOpen(false)
   
     
    }




  return (
    <>
    <Dialog open={open} onClose={onClose} >
<Box>
<PlaceItemDetailCard place={viewedPlace}/>
</Box>
    </Dialog>
<List sx={{display:'flex',flexDirection:'column',gap:'10px'}}>
{props.list&&props.list.map((place)=><ListItem sx={{border:'1px solid lightgray',justifyContent:'space-between'}} key={place.name+place.location_id}>
  <ListItemAvatar  >
  <Image alt={place.name} src={place?.photo?.images?.small?.url??'/images/placeholder.png'} width={75} height={75}/>
  </ListItemAvatar>
  <Box sx={{display:'flex',justifyContent:'space-between',width:'100%',flexWrap:"wrap",gap:'3px'}}>
  <Box marginLeft={"2%"}>
  <Typography  fontWeight='bold'>
    {place.name}
      </Typography>
      <Typography color={"GrayText"}>
    {place.location_string}
      </Typography>
  </Box>
 
  {isLoading?  <CircularProgress/> :<Box display={"flex"} alignItems={"center"}>
  <ListItemButton sx={{border:'1px solid lightgray',borderRadius:'50px',maxHeight:'50px'}} onClick={()=>viewHandler(place.location_id)}>{t("view")}</ListItemButton>
<ListItemButton sx={{display:'flex',justifyContent:'center',borderRadius:'50px',maxHeight:'50px'}} disabled={props.likedList.has(place.location_id)} onClick={()=>addHandler(place.location_id)} >{props.likedList.has(place.location_id)? <AddedIcon width={30} height={30}/> :t("add")}</ListItemButton>
 
  </Box>
}
</Box>
  </ListItem>)}
  </List>
  <SnackBar {...snackBarProps}/>
    </>
  )
}

export default AttracrionList