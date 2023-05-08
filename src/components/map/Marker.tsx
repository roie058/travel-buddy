import { IPlace } from '@/dummyData'
import { Box, Button, Card, CardActions, Rating, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import HeartBtn from '../ui/buttons/HeartBtn'
import styles from './Marker.module.css'
import { useSession,signIn } from 'next-auth/react'
import LikeModal from '../ui/list/LikeModal'
import { LikedMarker, MarkerIcon, Pin } from '../svgComponents'
import { MapContext } from '@/context/map-context'
type Props = {lat:number,lng:number,place:IPlace,liked?:boolean,onClick:(i:number,lat:number,lng:number,place:IPlace)=>void}





function isType(selected:string| "restaurants" | "hotels" | "attractions" ): selected is "restaurants" | "hotels" | "attractions"{
  return (selected as "restaurants" | "hotels" | "attractions") !== undefined;
}

export const ClusterMarker=(props)=>{
  return <div onClick={props.onClick} style={{width:`${10+(props.pointCount/props.length)*20}px`, height:`${10+(props.pointCount/props.length)*20}px`,maxHeight:'100px',maxWidth:'100px',justifyContent:'center',alignItems:'center',display:'flex',color:'white',backgroundColor:'blueviolet',borderRadius:'100%'}} className={styles.marker}>
     {props.children}
  </div>
}

const Marker = (props: Props) => {
  const {data:session}=useSession()
const [open, setOpen] = useState(false)
const [liked, setLiked] = useState(false)
const [location, setLocation] = useState<{lat:number,lng:number}>()
const mapCtx=useContext(MapContext)
const index= mapCtx.placeList.findIndex((place:IPlace)=>place.location_id===props.place.location_id)

useEffect(() => {
  setLocation({lat:props.lat,lng:props.lng})

}, [props.lat,props.lng])


  const clickHandler=()=>{
    if(!session){signIn(); return;}
    setOpen(true)
  }

  const closeHandler=()=>{
    setOpen(false)
    
   }
  
   const isSwipe=useMediaQuery('(max-width:800px)')
   const type:"restaurants" | "hotels" | "attractions"|string=(props.place?.category?.key??'hotel')+'s'
  

  return (
    <>
    
     <LikeModal likeHandler={closeHandler} clickedLocation={props.place} type={isType(type)?type:'hotels'} onClose={closeHandler} open={open} />
    {location&& <div  onClick={isSwipe?()=> props.onClick(index,props.lat,props.lng,props.place):()=>{}}  className={styles.marker}  >
      {props.liked?<LikedMarker width={50} height={50} className={styles.markerImg} />:
       <MarkerIcon  width={50} height={50}  /> }
        
     {!isSwipe ? <Card   elevation={3} onClick={()=>{props.onClick(index,props.lat,props.lng,props.place)}}   className={styles.paper} >
            <Image width={200} height={100} style={{objectFit:'cover'}} src={props.place.photo?.images.large.url??'/images/placeholder.png'} alt={props.place.name}/>
            <Box alignItems={'center'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} >
                <Typography sx={{padding:'1%'}} variant="body1" fontWeight={'bold'} className={styles.typography} >
                    {props.place.name}
                    
                    </Typography>
                   
                    {props.place?.rating&&<Box  display={'flex'}><Rating  value={Number(props.place?.rating)} precision={0.1} readOnly size="small"/><Typography  variant="subtitle2" color="GrayText">{props.place.price_level}</Typography> </Box> }
                    {props.place?.price&& <Typography  variant="subtitle2" color="GrayText">Price Range: {props.place?.price}</Typography>}
{props.place?.address && (<Typography gutterBottom fontSize={"0.7rem"}  variant='subtitle2' color="InfoText">
<Pin width={10} height={10}  /> {props.place.address}
</Typography>)}
{props.place?.phone && (<Typography gutterBottom variant='subtitle2' fontSize={"0.7rem"} color="InfoText">
{props.place.phone}
</Typography>)}
              
                    
                   { props.place.web_url&&props.place.website && <CardActions > <Button size='small' sx={{height:'30px',color:'#33e0a1cc',textTransform:'capitalize',border:'2px solid #33e0a1cc'}} onClick={()=> window.open(props.place.web_url,'_blank')} >Trip Adviser</Button>
<Button sx={{height:'30px',color:'#923CF8cc',textTransform:'capitalize',border:'2px solid #923CF8cc'}}   size='small' onClick={()=> window.open(props.place.website,'_blank')} >Website</Button>

</CardActions>}
{props.place.business_listings&& (props.place.business_listings.desktop_contacts.length>0 || props.place.business_listings.mobile_contacts.length>0) &&  <CardActions > {props.place.business_listings.mobile_contacts[0] && <Button sx={{height:'30px',color:'#923CF8cc',textTransform:'capitalize',border:'2px solid #923CF8cc'}}   size='small' onClick={()=> window.open(props.place.business_listings.mobile_contacts[0].value,'_blank')} >Website</Button>}
{props.place.business_listings&& props.place.business_listings.desktop_contacts[0] && <Button sx={{height:'30px',color:'#923CF8cc',textTransform:'capitalize',border:'2px solid #923CF8cc'}}   size='small' onClick={()=> window.open(props.place.business_listings.desktop_contacts[0].value,'_blank')} >Website</Button>}

</CardActions>}
</Box>
                    <div className={styles.heartBtn}>
                    <HeartBtn liked={false} onClick={clickHandler}/>
                    </div>
                      </Card>
                       :null
                      }
      </div>}

      </>
  )
}

export default Marker