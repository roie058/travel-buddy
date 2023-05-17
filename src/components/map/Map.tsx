import { Avatar, Button, ButtonGroup, Checkbox, CircularProgress, Divider, InputBase, ListItem, ListItemAvatar, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, MenuList, useMediaQuery } from '@mui/material'

import React, { useContext, useEffect, useState} from 'react'
import styles from './Map.module.css'
import { MapContext } from '@/context/map-context'
import { getPlaceData } from '@/hooks/data-hook'

import Image from 'next/image'
import { Box } from '@mui/system'
import { Autocomplete } from '@react-google-maps/api'
import MapComponent from './MapComponent'
import { IPlace } from '@/dummyData'
import  SearchIcon  from '../../../public/images/search.svg'
import { FilterIcon } from '../svgComponents'
import { Plan } from '../pageCompnents/Schedule'







type Props = {
  likedList:IPlace[]|[],
  likedIds:Set<string>,
  plans:Plan[]
}

const Map = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [likedList, setLikedList] = React.useState<IPlace[]>();
  const [allLikedList, setAllLikedList] = React.useState<IPlace[]>();
  const [mapFliter, setMapFliter] = React.useState<{plans:string[],restaurants:boolean,hotels:boolean,attractions:boolean}>({plans:[],restaurants:true,attractions:true,hotels:true});
  const open = Boolean(anchorEl);


const [autocomplete,setAutocomplete]=useState<google.maps.places.Autocomplete|null>(null)
const mapCtx = useContext(MapContext)

useEffect(()=>{
 
  let allLikedList:IPlace[];
  let likedIds:Set<string>;

    if(props.plans){
      setMapFliter({plans:props.plans.map((plan)=>plan._id),restaurants:true,attractions:true,hotels:true})
      allLikedList=props.plans.flatMap((plan:Plan)=> [...plan.liked.restaurants,...plan.liked.attractions,...plan.liked.hotels])
      likedIds=new Set(allLikedList?.map((place:IPlace)=>place.name+place.location_id));
   }
setAllLikedList(allLikedList)
    setLikedList(allLikedList)


},[props.plans])

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};

const filterList=(selected:string)=>{
console.log(props.likedList);
console.log(mapFliter);

switch (selected) {
  case "all":
    if(mapFliter.attractions&&mapFliter.hotels&&mapFliter.restaurants){
      setMapFliter((mapFilter)=>({...mapFilter,restaurants:false,hotels:false,attractions:false}))
      setLikedList([])
      }else{
        setMapFliter((mapFilter)=>({...mapFilter,restaurants:true,hotels:true,attractions:true}))
        setLikedList(allLikedList)
      }
    break;
    case "all-plans":
    if(mapFliter.plans.length<=0){
      setMapFliter((mapFilter)=>({...mapFilter, plans:props.plans.map((plan)=>plan._id)}))
      setLikedList(allLikedList)
    }else if(0 < mapFliter.plans.length && mapFliter.plans.length < props.plans.length){
      setMapFliter((mapFilter)=>({...mapFilter, plans:props.plans.map((plan)=>plan._id)}))
      setLikedList(allLikedList)
    
      }else{
        setMapFliter((mapFilter)=>({...mapFilter,plans:[]}))
        setLikedList([])
      }
    break;
    case "restaurants":
      if(!mapFliter.restaurants){
        setMapFliter((mapFilter)=>({...mapFilter,restaurants:true}))  
        setLikedList((likedList)=>[...likedList,...allLikedList.filter((place:IPlace)=>(place?.category?.key??'hotel')==='restaurant'&&mapFliter.plans.some(planId=>place.likedId.includes(planId)))])
        }else{
          setMapFliter((mapFilter)=>({...mapFilter,restaurants:false}))
          setLikedList((likedList)=>likedList.filter((place:IPlace)=>(place?.category?.key??'hotel')!=='restaurant'))
 }
      break;
      case 'hotels':
        if(!mapFliter.hotels){
          setMapFliter((mapFilter)=>({...mapFilter,hotels:true}))
        
          
          setLikedList((likedList)=>[...likedList,...allLikedList.filter((place:IPlace)=>{return (place?.category?.key??'hotel')==='hotel'&&mapFliter.plans.some(planId=>place.likedId.includes(planId))})])
          }else{
            setMapFliter((mapFilter)=>({...mapFilter,hotels:false}))
            setLikedList((likedList)=>likedList.filter((place:IPlace)=>{return(place?.category?.key??'hotel')!=='hotel'}))
          }
        break;
        case 'attractions':
          if(!mapFliter.attractions){
            setMapFliter((mapFilter)=>({...mapFilter,attractions:true}))
            setLikedList((likedList)=>[...likedList,...allLikedList.filter((place:IPlace)=>(place?.category?.key??'hotel')==='attraction'&&mapFliter.plans.some(planId=>place.likedId.includes(planId)))])
            }else{
              setMapFliter((mapFilter)=>({...mapFilter,attractions:false}))
              setLikedList((likedList)=>likedList.filter((place:IPlace)=>{return (place?.category?.key??'hotel')!=='attraction'}))
            }
          break;
  default: 
  if(new Set(mapFliter.plans).has(selected)){


setMapFliter((mapFilter)=>{return{...mapFilter,plans:mapFilter.plans.filter((planId)=>planId!==selected)}})
setLikedList((likedList)=> likedList.filter((place)=> !place.likedId.includes(selected)) )
  }else{
    const filtersOn=Object.keys(mapFliter).map((key)=>{
if(key==="plans"){return ""}
if(mapFliter[key]){
  return key
}
    })

    
    mapFliter.plans.push(selected)
    setLikedList((likedList)=> [...likedList, ...allLikedList.filter((place)=> place.likedId.includes(selected) && filtersOn.includes((place?.category?.key??'hotel')+'s'))] )
  }
    break;
}


}

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
<Image src={SearchIcon} alt='search' width={20} height={20}  />
</div>
<InputBase placeholder='Search...' />
</div>
</Autocomplete> 

  { mapCtx.isLoading?<CircularProgress size={'1.5rem'} />: <ButtonGroup orientation={isMobile?'horizontal':'vertical'} >
    <Button  onClick={()=>searchAreaHandler('attractions')}  sx={{width:'35px',minWidth:'0',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='atractions' width={20} height={20} src={'/images/amusment.gif'}/></Button>
    <Button onClick={()=>searchAreaHandler('hotels')}  sx={{minWidth:'0',width:'35px',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='Hotels' width={20} height={20} src={'/images/bed.png'}/></Button>
    <Button onClick={()=>searchAreaHandler('restaurants')}  sx={{minWidth:'0',width:'35px',textTransform:'capitalize',backgroundColor:"white",color:'#3c4043',border:'1px solid #3c404355'}} ><Image alt='restaurants' width={20} height={20} src={'/images/restaurant.png'}/></Button>
    <Button onClick={handleClick} sx={{backgroundColor:'white',minWidth:'min-content',padding:'6px'}}><FilterIcon width={25} height={25}/></Button> 
    </ButtonGroup>}
    </Box>
  
 {likedList&& <MapComponent likedMarkers={likedList} likedIds={props.likedIds}/>}

 
    
    </div>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
>
<MenuList>

<ListSubheader>Plan filter</ListSubheader>
<MenuItem  key={'all'} onClick={()=>{filterList('all-plans')}}>
    <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={mapFliter? mapFliter.plans.length===props.plans.length : true}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
            <ListItemText>All</ListItemText>
          </MenuItem>
        {props.plans&& props.plans.map((plan)=>{

          return <MenuItem  key={plan._id} >
    <ListItemIcon>
                <Checkbox
                  edge="start"
                  onClick={()=>{ filterList(plan._id)}}
                  disabled={mapFliter.plans.length===props.plans.length}
                  checked={new Set(mapFliter? mapFliter.plans:[]).has(plan._id)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>

            <ListItemAvatar ><Avatar><Image  alt={plan.header} src={plan.image} fill sizes='50px'  /></Avatar></ListItemAvatar>
            <ListItemText>{plan.header}</ListItemText>
       
          </MenuItem>
        })}
       
        <Divider />
        <ListSubheader>Type Filter</ListSubheader>
        <MenuItem onClick={()=>{filterList('all')}}><ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={mapFliter? mapFliter.attractions&&mapFliter.hotels&&mapFliter.restaurants : true}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
            <ListItemText>All</ListItemText></MenuItem>
        <MenuItem ><ListItemIcon>
                <Checkbox
                onClick={()=>{filterList('restaurants')}}
                  edge="start"
                  disabled={mapFliter.attractions&&mapFliter.hotels&&mapFliter.restaurants}
                  checked={mapFliter? mapFliter.restaurants : true}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
            <ListItemText>Restaurants</ListItemText></MenuItem>
        <MenuItem ><ListItemIcon>
                <Checkbox
                onClick={()=>{filterList('hotels')}}
                  edge="start"
                  disabled={mapFliter.attractions&&mapFliter.hotels&&mapFliter.restaurants}
                  checked={mapFliter? mapFliter.hotels : true}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
            <ListItemText>Hotels</ListItemText></MenuItem>
        <MenuItem ><ListItemIcon>
                <Checkbox
                  onClick={()=>{filterList('attractions')}}
                  edge="start"
                  disabled={mapFliter.attractions&&mapFliter.hotels&&mapFliter.restaurants}
                  checked={mapFliter? mapFliter.attractions : true}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
            <ListItemText>Attractions</ListItemText></MenuItem>
        </MenuList>
      </Menu>
    </>
  
  )
}



export default Map