import React, { MouseEventHandler, useState } from 'react'

import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material'
import Image from 'next/image'
import ListButton from '../buttons/ListButton'

import styles from './DayItemCard.module.css'

import { RoutineItem } from './DayList'
import PlaceDescriptionModal from './PlaceDescriptionModal'
import { Box } from '@mui/system'
import { Pin } from '@/components/svgComponents'

export type UserAddedItem={
  id:string,
name:string,
location:string,
description:string,
headImg:string,

}

type Props = { 
    btnText:string,
    withDiractions?:boolean,
    listItem:RoutineItem
 onClick:(id:string)=>void,
index:number,
position?:string
forceUpdate:()=>void
}


const UserAddedNote = (props: Props) => {
const [open, setOpen] = useState<boolean>(false)

  const clickHandler =()=>{
    props.onClick(props.listItem.dragId)
    }

  const  openHandler:MouseEventHandler=(e)=>{
    e.preventDefault()
setOpen(true)

  }
  const  closeHandler=()=>{
    props.forceUpdate()
setOpen(false)
}

  

      return (
        <>
        <PlaceDescriptionModal listItem={props.listItem} index={props.index} place={props.listItem.place} close={closeHandler} open={open} />
        <Card     >

        {props.position&&Number(props.position)!==0&& <CardHeader  sx={{width:'100%',height:'10px',background:'linear-gradient(60deg, rgba(35,58,102,1) 0%, rgba(36,53,98,1) 100%)',color:'white'}}  titleTypographyProps={{variant:'body1'}}  title={props.position==='mainAttraction'?'Main Attraction':props.position}/>}
           <Box  sx={{backgroundColor:"white",borderRadius:0 ,border:'0.5px dashed rgba(35,58,102,1) ' ,fontFamily: "Heebo, sans-serif",display:'flex',padding:'1% 1%',justifyContent:"flex-start",alignItems:'center',flexDirection:'column'}}>

           
            <CardContent  sx={{margin: '3%', marginRight:'0',padding:'0', paddingBottom:'0 !important'}}>
                <Typography variant='h5' fontSize={"1rem"} fontWeight="bold">{props.listItem.place.name} </Typography>
                <Typography variant="subtitle1" className={styles.address}><Pin height={10} width={10} /> {props.listItem.place.address}</Typography>
               <ListButton onClick={clickHandler} liked={true} noIcon={true}>{props.btnText} </ListButton>
               <Button sx={{textTransform:'capitalize'}} onClick={openHandler}>More Info</Button>
            </CardContent>
            </Box>
              </Card>
              </>
      )
    
    }

export default UserAddedNote