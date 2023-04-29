import { Button, ButtonGroup, InputBase, useMediaQuery } from '@mui/material'

import React, { useCallback, useContext, useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'
import styles from './Map.module.css'
import { MapContext } from '@/context/map-context'
import { getPlaceData } from '@/hooks/data-hook'
import Marker from './Marker'
import Image from 'next/image'
import { Box } from '@mui/system'
import { Autocomplete } from '@react-google-maps/api'






type Props = {
  likedList:any[],
  likedIds:Set<string>
}

const Map = (props: Props) => {
const [placeList, setPlaceList] = useState<JSX.Element[]>()
const [likedList, setLikedList] = useState<JSX.Element[]>()
const [autocomplete,setAutocomplete]=useState<google.maps.places.Autocomplete|null>(null)
const mapCtx = useContext(MapContext)

useEffect(() => {
  if(mapCtx){
    setPlaceList(mapCtx?.placeList?.filter((place)=>place.name&& !props.likedIds.has(place.name+place.location_id)).map((place,i)=><Marker place={place} key={i} lat={Number(place.latitude)} lng={Number(place.longitude)}/>))
  }
if(props.likedList){
  setLikedList(props.likedList?.map((place,i)=><Marker liked place={place} key={i} lat={Number(place.latitude)} lng={Number(place.longitude)}/>))

}
}, [mapCtx?.placeList,props.likedList])


const searchAreaHandler=(type:'restaurants'|'hotels'|'attractions')=>{
  if(mapCtx===null) return;
mapCtx.setIsLoading(true)
mapCtx.setType(type)
  getPlaceData(mapCtx.bounds,type)
.then((value)=>{
  console.log(value);
 mapCtx?.setPlaceList(value)
mapCtx?.setIsLoading(false)
})

}


 const isMobile=useMediaQuery('(min-width:600px)')

 const childClick=(child:any)=>{
    mapCtx?.setChildClicked(child)
 }

 const onLoad=(autoC: google.maps.places.Autocomplete)=>{ setAutocomplete(autoC)}

  const onPlaceChanged=()=>{
const lat=autocomplete?.getPlace().geometry?.location?.lat()
const lng=autocomplete?.getPlace().geometry?.location?.lng()
if(lat&&lng)mapCtx?.setCoordinates((coordinates)=> {return {lat:lat,lng:lng}})


  }









  return (
    <>

    <div style={{height:'100%', width:'100%',position:'relative'}} className={styles.map_container}> 
    <Box sx={{position:'absolute',top:'2%',gap:'15px',zIndex:'2',left:'2%',display:'flex', flexDirection:'row-reverse'}}>
    <Autocomplete className={styles.searchContainer} onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
<div className={styles.search} >
<div className={styles.searchIcon}>
<Image src={'/images/search.svg'} width={20} height={20} alt=""/>
</div>
<InputBase placeholder='Search...' />
</div>
</Autocomplete>
    <ButtonGroup orientation={isMobile?'horizontal':'vertical'} >
    <Button onClick={()=>searchAreaHandler('attractions')}  sx={{width:'35px',minWidth:'0',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='atractions' width={20} height={20} src={'/images/amusment.gif'}/></Button>
    <Button onClick={()=>searchAreaHandler('hotels')}  sx={{minWidth:'0',width:'35px',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='atractions' width={20} height={20} src={'/images/bed.png'}/></Button>
    <Button onClick={()=>searchAreaHandler('restaurants')}  sx={{minWidth:'0',width:'35px',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='atractions' width={20} height={20} src={'/images/restaurant.png'}/></Button>
    </ButtonGroup>
    </Box>
   {mapCtx?.coordinates&&
 <GoogleMapReact
 onChange={(e)=>{
 mapCtx?.setCoordinates({lat:e.center.lat,lng:e.center.lng})
mapCtx?.setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw})
}} 

onChildClick={childClick}
 center={mapCtx?.coordinates}
 bootstrapURLKeys={{key:'AIzaSyB_5RyNMBak3lrK10q9-dyPHWbOM8XKaKw'}}
   defaultZoom={14}

yesIWantToUseGoogleMapApiInternals
   >
   {placeList}
   {likedList}
   </GoogleMapReact>
}
 
    
    </div>
   
    </>
  
  )
}



export default Map