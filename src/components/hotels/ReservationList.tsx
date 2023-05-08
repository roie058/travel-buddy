


import { Box, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import Image from 'next/image'
import DeleteIcon from '../../../public/images/delete.svg'
import React, { useCallback, useState } from 'react'
import { Hotel, Plan } from '../pageCompnents/Schedule'



type Props = {plan?:Plan,plans?:Plan[]}
const ReservationList = (props: Props) => {
const [, updateState] = useState<any>();

  const forceUpdate = useCallback(() => updateState({}), []);
  let reservationList:Array<Hotel>=[]
  if(props.plan){
    reservationList=props.plan.hotels

  }else if(props.plans){
    reservationList=props.plans.flatMap((plan)=>plan.hotels)
  }



const deleteHotelHandler = async (hotel:Hotel,index:number)=>{

try {
  let planIndex
  if(props.plans){
    planIndex= props.plans.findIndex((plan)=>{
      return plan.hotels.find((reservation)=>hotel._id===reservation._id)
      }) 
  }
 


const {data}=await axios.delete('/api/hotel/deleteReservation',{params:{planId:planIndex&&props.plans ? props.plans[planIndex]._id:props.plan?._id,hotelId:hotel._id}})
if(data.success){
  if(props.plans&&planIndex){
    props.plans[planIndex].hotels.splice(index,1)
  }else{
    props.plan?.hotels.splice(index,1)
  }
  
  forceUpdate()
}
} catch (error) {
  
}


}
  return (
    <Box width={'100%'} height="100%">
    <Card sx={{height:'100%',borderRadius:'0' }}>
    <CardHeader sx={{textAlign:'center'}} title="My Reservations"></CardHeader>
    <Divider/>
    <CardContent sx={{minHeight:'50vh'}}>
    
    
    <List>
        
    {reservationList&& reservationList.map((reservation,index)=>
        <ListItem key={reservation._id} disablePadding>
        <ListItemIcon  sx={{flexGrow:'0',display:'flex',justifyContent:'left'}}  ><Image  width={100} height={130} alt='AirLine' style={{objectFit:"contain"}}   src={reservation?.place?.photo?.images.small.url??'/images/placeholder.png'} /> </ListItemIcon>
        <Box display={'flex'} paddingLeft={'15px'} justifyContent="center" textAlign={'left'} flexGrow={3} flexWrap="wrap">
        <ListItemText sx={{flexGrow:'100%',flexBasis:'100%'}} primaryTypographyProps={{fontWeight:"bold",fontSize:'1.3rem'}} >{reservation.place.name}</ListItemText>
        
        <ListItemText sx={{flexGrow:"100%",flexBasis:"50%"}}>{moment(reservation.start).format('DD/MM/YYYY')=== moment(reservation.end).format('DD/MM/YYYY')?moment(reservation.start).format('DD/MM/YYYY'):moment(reservation.start).format('DD/MM/YYYY')}</ListItemText>
        <ListItemText sx={{flexGrow:"100%",flexBasis:"50%"}}>{ moment(reservation.end).format('DD/MM/YYYY')}</ListItemText>
        <ListItemText sx={{flexGrow:"100%",flexBasis:"50%"}} >{reservation.nightPrice+(props.plan.budget.currency??'$')} Night</ListItemText>
        <ListItemText sx={{flexGrow:"100%",flexBasis:"50%"}} >{moment(reservation.end).diff(moment(reservation.start),'days') } Nights</ListItemText>
        </Box>
        <ListItemButton onClick={()=>{deleteHotelHandler(reservation,index)}} sx={{flexGrow:'0',width:"30px",height:'30px',padding:'0',textAlign:'center',justifyContent:'center'}}><Image alt='delete' fill sizes='30px' src={DeleteIcon}/></ListItemButton>
        
    
    </ListItem>    
    )
    }
    </List>
    </CardContent>
    </Card>
    
        </Box>
  )
}

export default ReservationList