


import { IPlace } from '@/dummyData'

import { Button, Card, CardContent, CardHeader, Icon, SvgIcon, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'

import React, { useState } from 'react'
import ListButton from '../buttons/ListButton'
import styles from './DayItemCard.module.css'
import { RoutineItem } from './DayList'
import PlaceDescriptionModal from './PlaceDescriptionModal'
import { AddedIcon, BreakfestIcon, DinnerIcon, HeartIcon, LunchIcon, MainAttractionIcon, Pin, SearchIcon, XIcon } from '@/components/svgComponents'
type Props = { 
    btnText:string,
    withDiractions?:IPlace|null,
    listItem:RoutineItem
    index:number
 onClick:(id:string)=>void,
static?:boolean,
position?:string,
forceUpdate:()=>void,
minify:boolean
}

const DayItemCard = (props: Props) => {

const [open, setOpen] = useState<boolean>(false)

const color = props.listItem.place.category.key=== "restaurant" ? "#3F950A" : "#6808A3"
const bgColor = props.listItem.place.category.key=== "restaurant" ? "#94FF9829" : "#CAB7FF29"

const openHandler=()=>{
setOpen(true)
}
const closeHandler=()=>{
  setOpen(false)
  props.forceUpdate()
  }
  

const clickHandler =()=>{
  if(!props.listItem.dragId){
props.onClick(props.listItem._id)
  }
props.onClick(props.listItem.dragId)

}

const typeInDay={breakfest:<BreakfestIcon  width={75} height={75}/>,lunch:<LunchIcon width={75} height={75}/>,dinner:<DinnerIcon width={75} height={75}/>,mainAttraction:<MainAttractionIcon width={75} height={75}/>}

  return (
    <>
    <PlaceDescriptionModal  listItem={props.listItem} index={props.index} static={props.static} place={props.listItem.place} close={closeHandler} open={open} />
    <Card sx={{height:!props.minify ?'150px':'60px',borderRadius:0 , fontFamily: "Heebo, sans-serif",display:'flex',flexDirection:props.minify?'row-reverse':"row",paddingX:'10px',justifyContent:'space-evenly',alignItems:'center',backgroundColor:bgColor,backdropFilter:'blur(2px)',position:'relative'}}     >
      <Button onClick={clickHandler} sx={{position:props.minify? 'static':'absolute',top:0,right:0,paddingX:1,minWidth:'max-content',zIndex:3}}>{<XIcon height={20} width={20}/>}</Button>
      
      {!props.minify&& props.position&& Number(props.position)!==0 && <Icon sx={{position:'absolute',bottom:0,right:0,width:75,height:60,padding:1}}>{typeInDay[props.position]}</Icon>}
     {/* props.position&& Number(props.position)!==0 && <CardHeader  sx={{height:'10px',background:'linear-gradient(60deg, rgba(35,58,102,1) 0%, rgba(36,53,98,1) 100%)',color:'white'}}  titleTypographyProps={{variant:'body1',textTransform:'capitalize'}}  title={props.position==='mainAttraction'?'Main Attraction':props.position}/> */}
     {!props.minify&&  <Image style={{objectFit:"cover",borderRadius:'10px'}} width={100} height={100}  src={props.listItem.place.photo?props.listItem.place.photo.images.small.url:'/images/placeholder.png'} alt={""}/>}
        <CardContent sx={{margin: '3%', marginRight:'0', width:props.minify?"100%":"auto", padding:'0', paddingBottom:'0 !important',display:!props.minify?"block":'flex',flexDirection:!props.minify?'column':'row',justifyContent:!props.minify?'center':"space-between",alignItems:props.minify? "center" :""}}>
            <Typography variant='h5' fontSize={"1rem"} fontWeight="bold">{props.listItem.place.name} </Typography>
            {!props.minify&&  <p className={styles.address}><Pin height={10} width={10} /> {props.listItem.place.address}</p>}
        
    <Button sx={{textTransform:'capitalize',backgroundColor:'white',border:`1px solid ${color}`,borderRadius:'30px',paddingX:2,fontWeight:'bold',color:color}} onClick={openHandler}>More Info</Button>
        </CardContent>
       
          </Card>
          </>
  )
}

export default DayItemCard