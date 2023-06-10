


import { Box, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import DeleteIcon from '../../../public/images/delete.svg'
import React from 'react'
import { Hotel, Plan } from '../pageCompnents/Schedule'
import useSnackBar from '@/hooks/useSnackBar'
import SnackBar from '../ui/SnackBar'
import { useTranslation } from 'next-i18next'
import { useMutation } from '@tanstack/react-query'
import { deleteReservation } from '@/util/fetchers'
import { queryClient } from '@/pages/_app'



type Props = {plan?:Plan,plans?:Plan[]}
const ReservationList = (props: Props) => {
  const {setSnackBar,snackBarProps} =useSnackBar()

const{t}=useTranslation("hotels")

  let reservationList:Array<Hotel>=[]
  if(props.plan){
    reservationList=props.plan.hotels

  }else if(props.plans){
    reservationList=props.plans.flatMap((plan)=>plan.hotels)
  }
const {mutate}=useMutation({mutationFn: deleteReservation,
  onMutate:({index})=>{
    props.plan?.hotels.splice(index,1)

  },
onSuccess:()=>{
  setSnackBar(t("snack.removeReservation"),"error")
queryClient.invalidateQueries(["plan",props.plan._id])
},
onError:()=>{
  setSnackBar(t("snack.serverError"),"error")
}

})


const deleteHotelHandler = async (hotel:Hotel,index:number)=>{
mutate({planId:props.plan._id,hotelId:hotel._id,index})

}
  return (
    <>
    <Box width={'100%'} height="100%">
    <Card sx={{height:'100%',borderRadius:'0' }}>
    <CardHeader sx={{textAlign:'center'}} title={t("header2")}></CardHeader>
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
        <ListItemText sx={{flexGrow:"100%",flexBasis:"50%"}} >{reservation.nightPrice+(props.plan.budget.currency??'$')} {t("night")} </ListItemText>
        <ListItemText sx={{flexGrow:"100%",flexBasis:"50%"}} >{moment(reservation.end).diff(moment(reservation.start),'days') } {t("nights")}</ListItemText>
        </Box>
        <ListItemButton onClick={()=>{deleteHotelHandler(reservation,index)}} sx={{flexGrow:'0',width:"30px",height:'30px',padding:'0',textAlign:'center',justifyContent:'center'}}><Image alt='delete' fill sizes='30px' src={DeleteIcon}/></ListItemButton>
        
    
    </ListItem>    
    )
    }
    </List>
    </CardContent>
    </Card>
    
        </Box>
        <SnackBar {...snackBarProps}/>
        </>
  )
}

export default ReservationList