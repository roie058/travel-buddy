


import { IPlace } from '@/dummyData'

import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'

import React, { useState } from 'react'
import ListButton from '../buttons/ListButton'
import styles from './DayItemCard.module.css'
import { RoutineItem } from './DayList'
import PlaceDescriptionModal from './PlaceDescriptionModal'
import { Pin } from '@/components/svgComponents'
type Props = { 
    btnText:string,
    withDiractions?:IPlace|null,
    listItem:RoutineItem
    index:number
 onClick:(id:string)=>void,
static?:boolean,
position?:string,
forceUpdate:()=>void
}

const DayItemCard = (props: Props) => {

const [open, setOpen] = useState<boolean>(false)

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
  return (
    <>
    <PlaceDescriptionModal  listItem={props.listItem} index={props.index} static={props.static} place={props.listItem.place} close={closeHandler} open={open} />
    <Card     >
     {props.position&& Number(props.position)!==0 && <CardHeader  sx={{height:'10px',background:'linear-gradient(60deg, rgba(35,58,102,1) 0%, rgba(36,53,98,1) 100%)',color:'white'}}  titleTypographyProps={{variant:'body1',textTransform:'capitalize'}}  title={props.position==='mainAttraction'?'Main Attraction':props.position}/>}
       <Box sx={{margin:'20px 0',borderRadius:0 , fontFamily: "Heebo, sans-serif",display:'flex',padding:'1% 1%',justifyContent:'space-evenly',alignItems:'center'}}>
        <Image style={{objectFit:"cover",borderRadius:'10px'}} width={100} height={100}  src={props.listItem.place.photo?props.listItem.place.photo.images.large.url:'/images/placeholder.png'} alt={""}/>
        <CardContent sx={{margin: '3%', marginRight:'0',padding:'0', paddingBottom:'0 !important'}}>
            <Typography variant='h5' fontSize={"1rem"} fontWeight="bold">{props.listItem.place.name} </Typography>
            <p className={styles.address}><Pin height={10} width={10} /> {props.listItem.place.address}</p>
        
           <ListButton onClick={clickHandler} liked={true} noIcon={true}  >{props.btnText} </ListButton>
    <Button sx={{textTransform:'capitalize'}} onClick={openHandler}>More Info</Button>
        </CardContent>
        </Box>
          </Card>
          </>
  )
}

export default DayItemCard