import React, { MouseEventHandler, useState } from 'react'

import { Button, Card, CardContent, CardHeader, Divider, Icon, Typography } from '@mui/material'
import Image from 'next/image'
import ListButton from '../buttons/ListButton'

import styles from './DayItemCard.module.css'

import { RoutineItem } from './DayList'
import PlaceDescriptionModal from './PlaceDescriptionModal'
import { Box } from '@mui/system'
import { AddedIcon, BreakfestIcon, DinnerIcon, LunchIcon, MainAttractionIcon, PaperPinIcon, Pin, SearchIcon, XIcon } from '@/components/svgComponents'

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
minify:boolean
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

  const typeInDay={breakfest:<BreakfestIcon  width={75} height={75}/>,lunch:<LunchIcon width={75} height={75}/>,dinner:<DinnerIcon width={75} height={75}/>,mainAttraction:<MainAttractionIcon width={75} height={75}/>}

      return (
        <>
        <PlaceDescriptionModal listItem={props.listItem} index={props.index} place={props.listItem.place} close={closeHandler} open={open} />
        <Card sx={{height:!props.minify ?'150px':'60px',paddingX:props.minify?'10px':'0',backgroundColor:"#FFFDF2CC",borderRadius:0 ,fontFamily: "Heebo, sans-serif",display:'flex',flexDirection:props.minify?'row-reverse':"row",alignItems:'center',position:'relative'}}     >
        <Button onClick={clickHandler} sx={{position:props.minify? "static":'absolute',top:0,right:0,paddingX:1,minWidth:'max-content',zIndex:3}}>{<XIcon height={20} width={20}/>}</Button>
        {!props.minify && props.position&& Number(props.position)!==0 && <Icon sx={{position:'absolute',bottom:0,right:0,width:75,height:60,padding:1}}>{typeInDay[props.position]}</Icon>}
       {!props.minify && <Icon sx={{position:'absolute',top:0,left:0,width:30,height:30,padding:1,zIndex:3}}><PaperPinIcon width={30} height={30} /></Icon>}

            <CardContent   sx={{zIndex:2,marginLeft: '25px',width:props.minify?"100%":"auto",  height:'100%',padding:'5%',paddingRight:props.minify? '0':'initial',paddingTop:props.minify?0:'', paddingBottom:'0 !important',borderLeft:'1px solid #B4050573',display:'flex',flexDirection:!props.minify?'column':'row',justifyContent:!props.minify?'center':"space-between",alignItems:props.minify? "center" :""}}>
           
               
                <Typography variant='h4' textTransform={"capitalize"} fontSize={"1rem"} fontWeight="bold">{props.listItem.place.name} </Typography>
                {!props.minify && <Typography variant="subtitle1" className={styles.address}><Pin height={10} width={10} /> {props.listItem.place.address}</Typography>  }
               <Button sx={{textTransform:'capitalize',backgroundColor:'white',border:`1px solid #95760A`,borderRadius:'30px',paddingX:2,fontWeight:'bold',color:'#95760A', maxWidth:'max-content'}} onClick={openHandler}>More Info</Button>
            </CardContent>

              <Box position={"absolute"} zIndex={1} display={'flex'} height={"100%"} marginTop={'22px'} justifyContent={"space-evenly"} flexDirection={"column"} top={0} right={0} width={'100%'}> 
                <Divider></Divider>
                <Divider></Divider>
                <Divider></Divider>
                <Divider></Divider>
                <Divider></Divider>
                <Divider></Divider>
              </Box>
              </Card>

              </>
      )
    
    }

export default UserAddedNote