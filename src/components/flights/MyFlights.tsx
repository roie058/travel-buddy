
import { Box, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import Image from 'next/image'


import React, { useCallback,  useState } from 'react'
import { Flight } from './AddFlightModal'
import { Plan } from '@/pages/plans/[planId]/schedule'

type Props = {plan?:Plan,plans?:Plan[]}

const MyFlights = (props: Props) => {

const [, updateState] = useState<any>();

  const forceUpdate = useCallback(() => updateState({}), []);
  let flightList:Array<Flight>=[]
  if(props.plan){
    flightList=props.plan?.flights

  }else if(props.plans){
    flightList=props.plans.reduce((prev,cur)=>  [...prev,...cur.flights],[])
  }



const deleteFlightHandler = async (flight:Flight,index:number)=>{

try {
  let planIndex;
  if(props.plans){
 planIndex= props?.plans.findIndex((plan)=>{
return plan.flights.find((fligthPlan)=>flight._id===fligthPlan._id)
}) }

if( typeof planIndex !=='number'){ return }

const {data}=await axios.delete('/api/flight/deleteFlight',{params:{planId:props.plan?._id??props?.plans[planIndex]._id,flightId:flight._id}})
if(data.success){
 if (props.plan){
  props.plan.flights.splice(index,1)
 }
 if(props.plans){
  props?.plans[planIndex].flights.splice(index,1)
 }
  forceUpdate()
}
} catch (error) {
  
}


}


  return (
    <Box width={'100%'} height="100%">
<Card>
<CardHeader sx={{textAlign:'center'}} title="My Flights"></CardHeader>
<Divider/>
<CardContent sx={{minHeight:'50vh'}}>


<List>
    
{flightList&& flightList.map((flight,index)=>
    <ListItem key={flight.flightNumber+flight._id}>
    <ListItemIcon  sx={{flexGrow:'0',display:'flex',justifyContent:'left'}}  ><Image  width={70} height={70} alt='AirLine' style={{objectFit:"contain"}}   src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${flight.airline.iata}`} /> </ListItemIcon>
    <Box display={'flex'} justifyContent="center" textAlign={'center'} flexGrow={3} flexWrap="wrap">
    
    <ListItemText sx={{flexGrow:'50%',flexBasis:'50%'}} primaryTypographyProps={{fontWeight:"bold"}} >{flight.origin.iata+' - '+flight.destination.iata}</ListItemText>
    <ListItemText sx={{flexGrow:"50%",flexBasis:"50%"}} primaryTypographyProps={{fontWeight:"bold"}}>{flight.flightNumber}</ListItemText>
    <ListItemText sx={{flexGrow:"50%",flexBasis:"50%"}}>{moment(flight.start).format('DD/MM/YYYY')=== moment(flight.end).format('DD/MM/YYYY')?moment(flight.start).format('DD/MM/YYYY'):moment(flight.start).format('DD/MM/YYYY')+':'+ moment(flight.end).format('DD/MM/YYYY')}</ListItemText>
    <ListItemText sx={{flexGrow:"50%",flexBasis:"50%"}}>{moment(flight.start).format('HH:mm')+'-'+moment(flight.end).format('HH:mm')}</ListItemText>
    </Box>
    <ListItemButton onClick={()=>{deleteFlightHandler(flight,index)}} sx={{flexGrow:'0',width:"30px",height:'30px',padding:'0',textAlign:'center',justifyContent:'center'}}><Image alt='delete' width={12} height={12} src={'/images/delete.svg'}/></ListItemButton>
    

</ListItem>    
)
}
</List>
</CardContent>
</Card>

    </Box>
  )
}

export default MyFlights