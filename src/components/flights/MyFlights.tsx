
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, MenuItem, Select } from '@mui/material'

import Image from 'next/image'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
const EditFlight=dynamic(()=>import('./EditFlight'),{loading:()=><div>loading...</div>})
import React, { useState } from 'react'
import { Flight } from './AddFlightModal'
import { Plan } from '../pageCompnents/Schedule'

import DeleteIcon from '../../../public/images/delete.svg'
import useSnackBar from '@/hooks/useSnackBar'
import SnackBar from '../ui/SnackBar'
import { useTranslation } from 'next-i18next'
import { useMutation } from '@tanstack/react-query'
import { deleteFlight,bookFlight } from '@/util/fetchers'
import { queryClient } from '@/pages/_app'

import {  Arrow, EditIcon } from '../svgComponents'
import { FlightFullItration, FlightItration } from './ResultCard'


type Props = {plan?:Plan,plans?:Plan[]}

const MyFlights = (props: Props) => {
const {setSnackBar,snackBarProps}=useSnackBar()
const [selectedFlight,setSelectedFlight]=useState<{open:boolean,flight:Flight,plan:Plan}>()
const [detailes,setDetailes]=useState<number|undefined>()
const [filter,setFilter]=useState<string>("all")
const {t}=useTranslation("flights")

  let flightList:Array<Flight>=[]

  if(props.plan){
    flightList=props.plan?.flights
  }else if(props.plans){
if(filter=="all"){
  flightList=props.plans.flatMap((plan)=>plan.flights) 
}else{
  flightList=props.plans.find((plan)=>plan._id==filter).flights
}
  }

const {mutate}=useMutation({ mutationFn:deleteFlight,onMutate:({planIndex,index})=>{
  if (props.plan){
    props.plan.flights.splice(index,1)
   }
   if(props.plans){
    props?.plans[Number(planIndex)].flights.splice(index,1)
   }
},onSuccess:(data,{planId})=>{
  if(props.plan){
    queryClient.invalidateQueries(["plan",planId])
  }else if (props.plans){
    queryClient.invalidateQueries(["plans"])
  }
  setSnackBar(t("snack.removed"),'error')

},onError:()=>{

  setSnackBar(t("snack.error"),"error")

}})

const {mutate:book}=useMutation({ mutationFn:bookFlight,onMutate:({planIndex,index})=>{
  if (props.plan){
    props.plan.flights[index].booked = !props.plan.flights[index].booked
   }
},onSuccess:(data,{planId})=>{
  if(props.plan){
    queryClient.invalidateQueries(["plan",planId])
  }else if (props.plans){
    queryClient.invalidateQueries(["plans"])
  }
  setSnackBar(t("snack.removed"),'error')

},onError:()=>{

  setSnackBar(t("snack.error"),"error")

}})

const deleteFlightHandler = async (flight:Flight,index:number)=>{
  let planId;
  let planIndex;
  if(props.plans){
 planIndex= props?.plans.findIndex((plan)=>{
return plan.flights.find((fligthPlan)=>flight._id===fligthPlan._id)
})
planId=props?.plans[planIndex]._id
}else if (props.plan){
  planId=props.plan._id
}
mutate({planId:planId,flightId:flight._id,planIndex,index})
}

const bookFlightHandler = async (flight:Flight,index:number)=>{
  let planId;
  let planIndex;
  if(props.plans){
 planIndex= props?.plans.findIndex((plan)=>{
return plan.flights.find((fligthPlan)=>flight._id===fligthPlan._id)
})
planId=props?.plans[planIndex]._id
}else if (props.plan){
  planId=props.plan._id
}
book({planId:planId,flightId:flight._id,planIndex,index})
}

const editOpen =(flight:Flight)=>{
  let plan=props.plan
  if(props.plans){
plan=props.plans.find((plan)=>plan.flights.find((flight)=>flight._id==flight._id));
  }
setSelectedFlight({open:true,flight,plan:plan})

}


  return (
    <>
  {!selectedFlight?  <Box sx={{overflowY:"scroll"}} width={'100%'} height="100%">
<Card>
<CardHeader sx={{textAlign:'center'}} title={t("header2")}></CardHeader>
<Divider/>
<CardContent sx={{minHeight:'50vh'}}>
{props.plans&&<Select fullWidth onChange={(e)=>setFilter(e.target.value)} defaultValue={"all"} >
<MenuItem key={"all"}   value="all">All</MenuItem>
{props.plans.filter((plan)=>plan.flights.length>0).map((plan)=><MenuItem value={plan._id} key={plan._id} >{plan.header}</MenuItem>)}
</Select>
}
<List>
    
{flightList&& flightList.map((flight,index)=> flight?.flightDetails?.length>0 ?  
  <ListItem key={flight._id} sx={{display:"flex",marginLeft:"10%",gap:"25px",flexWrap:"wrap",paddingLeft:"0",marginTop:"20px"}}>
{detailes===index?
 <Box flexWrap={"wrap"} display={"flex"} gap={"15%"}> 
 <FlightFullItration city={flight.destination.name} route={flight.flightDetails} />
 </Box>  :
<>
<FlightItration arrival={flight.arrival}  departure={flight.departure} duration={dayjs(flight.flightDetails[flight?.flightDetails.length-1].utc_arrival).diff(flight.flightDetails[0].utc_departure,"seconds")}  cityFrom={flight.origin.name} cityTo={flight.destination.name} flyFrom={flight.origin.iata} flyTo={flight.destination.iata} routes={flight.flightDetails} />
</>
}   
    <Box  display={'flex'} justifyContent={"center"} alignItems={"center"} >
        <IconButton onClick={()=>setDetailes((details)=> index===details? undefined :index)}  ><Arrow transform={detailes===index? "rotate(270)" :"rotate(90)"} width={20} height={25}/></IconButton>
        </Box>
        <ButtonGroup  sx={{borderColor:"gray",marginRight:"10%"}}>
      <Button onClick={()=>{deleteFlightHandler(flight,index)}} sx={{flexGrow:'0',textAlign:'center',borderColor:"lightGray",justifyContent:'center'}}><Image alt='delete' fill sizes='30px' src={DeleteIcon}/></Button>
     {flight.addedMethod === "manual" ? <Button onClick={()=>{console.log(props.plan.flights);editOpen(flight)}} sx={{flexGrow:'0',borderColor:"gray",width:"30px",height:'30px',padding:'0',textAlign:'center',justifyContent:'center'}}><EditIcon width={30} height={30}/></Button>:
     <Button onClick={()=>{bookFlightHandler(flight,index) }} sx={{ color:flight.booked? "gray" :"info",textTransform:"capitalize",flexGrow:'0',borderColor:"lightGray",textAlign:'center',justifyContent:'center'}}>{flight.booked?t("booked"):t("book")}</Button>
     }

    </ButtonGroup>
       
        </ListItem>

:  
    <ListItem key={flight.flightNumber+flight._id}>
    <ListItemIcon  sx={{flexGrow:'0',display:'flex',justifyContent:'left'}}  ><Image  width={70} height={70} alt='AirLine' style={{objectFit:"contain"}}   src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${flight?.airline[0]}`} /> </ListItemIcon>
    <Box display={'flex'} justifyContent="center" textAlign={'center'} flexGrow={3} flexWrap="wrap">
    
    <ListItemText sx={{flexGrow:'50%',flexBasis:'50%'}} primaryTypographyProps={{fontWeight:"bold"}} >{flight.origin.iata+' - '+flight.destination?.iata}</ListItemText>
    <ListItemText sx={{flexGrow:"50%",flexBasis:"50%"}} primaryTypographyProps={{fontWeight:"bold"}}>{flight.flightNumber[0]}</ListItemText>
    <ListItemText sx={{flexGrow:"50%",flexBasis:"50%"}}>{ dayjs(flight.departure).diff(flight.arrival,'day')==0?dayjs(flight.departure).format('DD/MM/YYYY'):dayjs(flight.departure).format('DD/MM/YYYY')+'-'+ dayjs(flight.arrival).format('DD/MM/YYYY')}</ListItemText>
    <ListItemText sx={{flexGrow:"50%",flexBasis:"50%"}}>{dayjs(flight.departure).format('HH:mm')+'-'+dayjs(flight.arrival).format('HH:mm')}</ListItemText>
    </Box>
    <ButtonGroup sx={{borderColor:"gray",marginRight:"10%"}}>
      <Button onClick={()=>{deleteFlightHandler(flight,index)}} sx={{borderColor:"gray",flexGrow:'0',width:"30px",height:'30px',padding:'0',textAlign:'center',justifyContent:'center'}}><Image alt='delete' fill sizes='30px' src={DeleteIcon}/></Button>
      <Button onClick={()=>{console.log(props.plan.flights);
      editOpen(flight)}} sx={{borderColor:"gray",flexGrow:'0',width:"30px",height:'30px',padding:'0',textAlign:'center',justifyContent:'center'}}><EditIcon width={30} height={30}/></Button>
    </ButtonGroup>
</ListItem>    
)}
</List>
</CardContent>
</Card>

    </Box>: <EditFlight flight={selectedFlight.flight} setSnackBar={setSnackBar} plan={selectedFlight.plan} onClose={()=>setSelectedFlight(null)} />}
   
    <SnackBar {...snackBarProps} />
    </>
  )
}

export default MyFlights