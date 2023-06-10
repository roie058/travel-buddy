
import { MapContext } from '@/context/map-context'
import { IPlace } from '@/dummyData'
import { Card, CardContent, CardMedia, Typography,Box, Chip, CardActions, Button, Rating, Badge } from '@mui/material'
import Image from 'next/image'
import {useSession,signIn} from 'next-auth/react'

import React, { MouseEventHandler, useContext, useState } from 'react'
import HeartBtn from '../buttons/HeartBtn'
import LikeModal from '../list/LikeModal'
import { Pin } from '@/components/svgComponents'
import useSnackBar from '@/hooks/useSnackBar'
import SnackBar from '../SnackBar'
import { useQuery } from '@tanstack/react-query'
import { Plan } from '@/components/pageCompnents/Schedule'



type Props = {
  place:IPlace,
  type:string,
  refEl?:any,
  selected?:boolean,
  index?:number,
  liked?:boolean
}

function isType(selected:string| "restaurants" | "hotels" | "attractions" ): selected is "restaurants" | "hotels" | "attractions"{
  return (selected as "restaurants" | "hotels" | "attractions") !== undefined;
}

const PlaceCard = (props: Props) => {
const [open, setOpen] = useState(false)
  const [liked,setLiked]=useState(props.liked)
  const mapCtx=useContext(MapContext)
const {data:session}=useSession()
  const {setSnackBar,snackBarProps}=useSnackBar()
  const {data:plans}:{data:Plan[]}=useQuery({queryKey:["plans",{populate:true}]})
  const clickHandler=()=>{
    if(!session){signIn(); return;}  
    setOpen(true)
  }

 const closeHandler=()=>{
  setOpen(false)
  
 }

 const likeHandler=()=>{
  setOpen(false)
  
 }

if(props.selected){props.refEl?.current?.scrollIntoView({behavior:'smooth',block:'start'})}



const coordinatesHandler:MouseEventHandler=(e)=>{
e.preventDefault();
if(mapCtx===null) return;


mapCtx?.setCoordinates({lat:Number(props.place.latitude),lng:Number(props.place.longitude)})
mapCtx.setChildClicked(props.index)
if(!mapCtx.mapRef.current)return;
  mapCtx.mapRef?.current?.setZoom(20);
  mapCtx.mapRef.current?.panTo({lat:Number(props.place.latitude),lng:Number(props.place.longitude)});



}

const type:"restaurants" | "hotels" | "attractions"|string=(props.place?.category?.key??'hotel')+'s'

  return (
    <>
    <SnackBar {...snackBarProps} />
    <LikeModal setSnackBar={setSnackBar} likeHandler={likeHandler} clickedLocation={props.place} type={isType(type)?type:'hotels'} onClose={closeHandler} open={open} />
    <Card elevation={6} sx={{display:'flex'}} ref={props.refEl} >
      <CardMedia onClick={coordinatesHandler} sx={{width:'150px',cursor:'pointer'}} title={props.place.name}  image={props.place.photo? props.place.photo.images.large.url: "/images/placeholder.png"}  />
    <CardContent sx={{width:'60%'}}  >
      <Box onClick={coordinatesHandler} sx={{cursor:'pointer'}} display={"flex"} justifyContent="space-between">
      <Typography  fontSize={'1.3rem'} fontWeight={'bold'}>{props.place.name} </Typography>
      <Badge  anchorOrigin={{vertical:'top',horizontal:'right'}} badgeContent={plans.map((plan)=>{
        const placeArr=plan.liked[(props.place?.category?.key??'hotel')+'s']
       if(!placeArr) return;
        const place=placeArr.find((place:IPlace)=>place.location_id===props.place.location_id)
        if(place){
          return 1
        }
      else return ;
      
        
        }).reduce((prev,cur)=>{if(Number(cur)){return Number(prev)+Number(cur)}else{return prev}  },0)}>
      <HeartBtn liked={liked} onClick={clickHandler} />
      </Badge>
      
      </Box>

{props.place?.rating&&<Box  display={'flex'}><Rating value={Number(props.place?.rating)} precision={0.1} readOnly size="small"/> <Typography color={'primary'}   variant='body2' sx={{marginLeft:'5px'}}>{props.place?.num_reviews} reviews</Typography></Box> }
<Typography gutterBottom variant="subtitle2" color="GrayText">{props.place.price_level}</Typography>
{props.place?.price&& <Typography  variant="subtitle2" gutterBottom>Price Range: {props.place?.price}</Typography>}
{props.place?.address && (<Typography gutterBottom variant='subtitle2' color="InfoText">
<Pin width={12} height={10}  /> {props.place.address}
</Typography>)}
{props.place?.phone && (<Typography gutterBottom variant='subtitle2' color="InfoText">
{props.place.phone}
</Typography>)}

<Typography variant="subtitle2">{props.place.ranking}</Typography>
{props.place?.awards&& props.place?.awards[0] &&
<Box display={"flex"} my={1}>
<Image width={12} height={10} src={props.place.awards[0].images.small} alt={props.place.awards[0].display_name}  />
<Typography color={"GrayText"} variant="subtitle2">{props.place.awards[0].display_name}</Typography>
</Box>
}
<Box my={1}>
{props.place?.cuisine?.filter((cusine:any,i:number)=> (i<3)).map((cuisine:any)=>(<Chip key={cuisine.name} size='small' label={cuisine.name} />))}
</Box>

{ props.place.web_url&&props.place.website && <CardActions > <Button size='small' sx={{color:'#33e0a1cc',textTransform:'capitalize',border:'2px solid #33e0a1cc'}} onClick={()=> window.open(props.place.web_url,'_blank')} >Trip Adviser</Button>
<Button sx={{color:'#923CF8cc',textTransform:'capitalize',border:'2px solid #923CF8cc'}}   size='small' onClick={()=> window.open(props.place.website,'_blank')} >Website</Button>

</CardActions>}

{props.place.business_listings&&(props.place.business_listings.desktop_contacts.length>0 || props.place?.business_listings.mobile_contacts.length>0) &&  <CardActions > {props.place.business_listings.mobile_contacts[0] && <Button sx={{height:'30px',color:'#923CF8cc',textTransform:'capitalize',border:'2px solid #923CF8cc'}}   size='small' onClick={()=> window.open(props.place.business_listings.mobile_contacts[0].value,'_blank')} >Website</Button>}
{props.place.business_listings&& props.place?.business_listings.desktop_contacts[0] && <Button sx={{height:'30px',color:'#923CF8cc',textTransform:'capitalize',border:'2px solid #923CF8cc'}}   size='small' onClick={()=> window.open(props.place.business_listings.desktop_contacts[0].value,'_blank')} >Website</Button>}

</CardActions>}
    </CardContent>
    </Card>
    </>
  )
}

export default PlaceCard