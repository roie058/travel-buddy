import { Button, ButtonGroup, CircularProgress, InputBase, useMediaQuery } from '@mui/material'

import React, { useContext, useState} from 'react'
import styles from './Map.module.css'
import { MapContext } from '@/context/map-context'
import { getPlaceData } from '@/hooks/data-hook'

import Image from 'next/image'
import { Box } from '@mui/system'
import { Autocomplete } from '@react-google-maps/api'
import MapComponent from './MapComponent'
import { IPlace } from '@/dummyData'
import  SearchIcon  from '../../../public/images/search.svg'






type Props = {
  likedList:IPlace[]|[],
  likedIds:Set<string>
}

const Map = (props: Props) => {


const [autocomplete,setAutocomplete]=useState<google.maps.places.Autocomplete|null>(null)
const mapCtx = useContext(MapContext)


const searchAreaHandler=(type:'restaurants'|'hotels'|'attractions')=>{
  if(mapCtx===null) return;
mapCtx.setIsLoading(true)
mapCtx.setType(type)
  getPlaceData(mapCtx.bounds,type)
.then((value)=>{

 mapCtx?.setPlaceList(value)
mapCtx?.setIsLoading(false)
})

}


 const isMobile=useMediaQuery('(min-width:600px)')

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
<Image src={SearchIcon} alt='search' width={20} height={20} />
</div>
<InputBase placeholder='Search...' />
</div>
</Autocomplete> 
  { mapCtx.isLoading?<CircularProgress size={'1.5rem'} />: <ButtonGroup orientation={isMobile?'horizontal':'vertical'} >
    <Button  onClick={()=>searchAreaHandler('attractions')}  sx={{width:'35px',minWidth:'0',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='atractions' width={20} height={20} src={'/images/amusment.gif'}/></Button>
    <Button onClick={()=>searchAreaHandler('hotels')}  sx={{minWidth:'0',width:'35px',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='Hotels' width={20} height={20} src={'/images/bed.png'}/></Button>
    <Button onClick={()=>searchAreaHandler('restaurants')}  sx={{minWidth:'0',width:'35px',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='restaurants' width={20} height={20} src={'/images/restaurant.png'}/></Button>
    </ButtonGroup>}
    </Box>
  
 <MapComponent likedMarkers={props.likedList} likedIds={props.likedIds}/>

 
    
    </div>
   
    </>
  
  )
}



export default Map