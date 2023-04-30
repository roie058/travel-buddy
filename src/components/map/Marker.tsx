import { IPlace } from '@/dummyData'
import { Box, Button, Card, CardActions, Rating, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react'
import HeartBtn from '../ui/buttons/HeartBtn'
import styles from './Marker.module.css'
import { useSession,signIn } from 'next-auth/react'
import LikeModal from '../ui/list/LikeModal'
type Props = {lat:number,lng:number,place:IPlace,liked?:boolean}

declare module 'react' {
  interface HTMLAttributes<T> {
    lat?:number,
    lng?:number
 }

}

function isType(selected:string| "restaurants" | "hotels" | "attractions" ): selected is "restaurants" | "hotels" | "attractions"{
  return (selected as "restaurants" | "hotels" | "attractions") !== undefined;
}

const Marker = (props: Props) => {
  const {data:session}=useSession()
const [open, setOpen] = useState(false)
const [liked, setLiked] = useState(false)
const [hover, setHover] = useState(false)
const [location, setLocation] = useState<{lat:number,lng:number}>()

useEffect(() => {
  setLocation({lat:props.lat,lng:props.lng})
console.log('cahnge');

  
}, [props.lat,props.lng])


  const clickHandler=()=>{
    if(!session){signIn(); return;}
    setOpen(true)
  }

  const closeHandler=()=>{
    setOpen(false)
    
   }
  
   const isMobile=useMediaQuery('(min-width:600px)')
   const type:"restaurants" | "hotels" | "attractions"|string=(props.place?.category?.key??'hotel')+'s'
  
 

  return (
    <>
    
     <LikeModal likeHandler={closeHandler} clickedLocation={props.place} type={isType(type)?type:'hotels'} onClose={closeHandler} open={open} />
    {location&& <div  onClick={!isMobile? ()=>{setHover(!hover)}:()=>{}}  className={styles.marker}  lat={location?.lat} lng={location?.lng}>
      <Image  width={50} height={50} src={props.liked?'/images/likedMarker.svg':'/images/marker.png'} className={styles.markerImg} alt={props.place.name} />
        
     {isMobile ? <Card   elevation={3}   className={styles.paper} >
            <Image width={200} height={100} style={{objectFit:'cover'}} src={props.place.photo?.images.large.url??'/images/placeholder.png'} alt={props.place.name}/>
            <Box alignItems={'center'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} >
                <Typography sx={{padding:'1%'}} variant="body1" fontWeight={'bold'} className={styles.typography} >
                    {props.place.name}
                    
                    </Typography>
                   
                    {props.place?.rating&&<Box  display={'flex'}><Rating  value={Number(props.place?.rating)} precision={0.1} readOnly size="small"/><Typography  variant="subtitle2" color="GrayText">{props.place.price_level}</Typography> </Box> }
                    {props.place?.price&& <Typography  variant="subtitle2" color="GrayText">Price Range: {props.place?.price}</Typography>}
{props.place?.address && (<Typography gutterBottom fontSize={"0.7rem"}  variant='subtitle2' color="InfoText">
<Image alt='' width={7} height={7}  src={'/images/pin.svg'}/> {props.place.address}
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
                    <HeartBtn liked={liked} onClick={clickHandler}/>
                    </div>
                      </Card>
                       :<Card   elevation={3} onClick={()=>setHover(!hover)}  className={hover?styles.mobilePaper:styles.paper}>
            <Image width={200} height={100} style={{objectFit:'cover'}} src={props.place.photo?.images.large.url??'/images/placeholder.png'} alt={props.place.name}/>
            <Box alignItems={'center'} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} >
                <Typography sx={{padding:'1%'}} variant="body1" fontWeight={'bold'} className={styles.typography} >
                    {props.place.name}
                    
                    </Typography>
                   
                    {props.place?.rating&&<Box  display={'flex'}><Rating  value={Number(props.place?.rating)} precision={0.1} readOnly size="small"/><Typography  variant="subtitle2" color="GrayText">{props.place.price_level}</Typography> </Box> }
                    {props.place?.price&& <Typography  variant="subtitle2" color="GrayText">Price Range: {props.place?.price}</Typography>}
{props.place?.address && (<Typography gutterBottom fontSize={"0.7rem"}  variant='subtitle2' color="InfoText">
<Image alt='' width={7} height={7}  src={'/images/pin.svg'}/> {props.place.address}
</Typography>)}
{props.place?.phone && (<Typography gutterBottom variant='subtitle2' fontSize={"0.7rem"} color="InfoText">
{props.place.phone}
</Typography>)}
              
                    
                   { props.place.web_url&&props.place.website &&   <CardActions > <Button size='small' sx={{height:'30px',color:'#33e0a1cc',textTransform:'capitalize',border:'2px solid #33e0a1cc'}} onClick={()=> window.open(props.place.web_url,'_blank')} >Trip Adviser</Button>
<Button sx={{height:'30px',color:'#923CF8cc',textTransform:'capitalize',border:'2px solid #923CF8cc'}}   size='small' onClick={()=> window.open(props.place.website,'_blank')} >Website</Button>

</CardActions>}
{props.place.business_listings&& (props.place.business_listings.desktop_contacts.length>0 || props.place.business_listings.mobile_contacts.length>0) &&  <CardActions > {props.place.business_listings.mobile_contacts[0] && <Button sx={{height:'30px',color:'#923CF8cc',textTransform:'capitalize',border:'2px solid #923CF8cc'}}   size='small' onClick={()=> window.open(props.place.business_listings.mobile_contacts[0].value,'_blank')} >Website</Button>}
{props.place.business_listings.desktop_contacts[0] && <Button sx={{height:'30px',color:'#923CF8cc',textTransform:'capitalize',border:'2px solid #923CF8cc'}}   size='small' onClick={()=> window.open(props.place.business_listings.desktop_contacts[0].value,'_blank')} >Website</Button>}

</CardActions>}
</Box>
                    <div className={styles.heartBtn}>
                    <HeartBtn liked={liked} onClick={clickHandler}/>
                    </div>
                      </Card>
                      }
      </div>}

      </>
  )
}

export default Marker