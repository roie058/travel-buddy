
import { Box, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import moment from 'moment'
import Image from 'next/image'


import React from 'react'
import { Flight } from './AddFlightModal'
import { Plan } from '../pageCompnents/Schedule'

import DeleteIcon from '../../../public/images/delete.svg'
import useSnackBar from '@/hooks/useSnackBar'
import SnackBar from '../ui/SnackBar'
import { useTranslation } from 'next-i18next'
import { useMutation } from '@tanstack/react-query'
import { deleteFlight } from '@/util/fetchers'
import { queryClient } from '@/pages/_app'

type Props = {plan?:Plan,plans?:Plan[]}

const MyFlights = (props: Props) => {
const {setSnackBar,snackBarProps}=useSnackBar()
const {t}=useTranslation("flights")

  let flightList:Array<Flight>=[]

  if(props.plan){
    flightList=props.plan?.flights

  }else if(props.plans){
    flightList=props.plans.reduce((prev:Flight[],cur)=>  [...prev,...cur.flights],[])
  }

const {mutate}=useMutation(deleteFlight,{onMutate:({planIndex,index})=>{
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


  return (
    <>
    <Box width={'100%'} height="100%">
<Card>
<CardHeader sx={{textAlign:'center'}} title={t("header2")}></CardHeader>
<Divider/>
<CardContent sx={{minHeight:'50vh'}}>


<List>
    
{flightList&& flightList.map((flight,index)=>
    <ListItem key={flight.flightNumber+flight._id}>
    <ListItemIcon  sx={{flexGrow:'0',display:'flex',justifyContent:'left'}}  ><Image  width={70} height={70} alt='AirLine' style={{objectFit:"contain"}}   src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${flight.airline?.iata}`} /> </ListItemIcon>
    <Box display={'flex'} justifyContent="center" textAlign={'center'} flexGrow={3} flexWrap="wrap">
    
    <ListItemText sx={{flexGrow:'50%',flexBasis:'50%'}} primaryTypographyProps={{fontWeight:"bold"}} >{flight.origin.iata+' - '+flight.destination?.iata}</ListItemText>
    <ListItemText sx={{flexGrow:"50%",flexBasis:"50%"}} primaryTypographyProps={{fontWeight:"bold"}}>{flight.flightNumber}</ListItemText>
    <ListItemText sx={{flexGrow:"50%",flexBasis:"50%"}}>{moment(flight.start).format('DD/MM/YYYY')=== moment(flight.end).format('DD/MM/YYYY')?moment(flight.start).format('DD/MM/YYYY'):moment(flight.start).format('DD/MM/YYYY')+':'+ moment(flight.end).format('DD/MM/YYYY')}</ListItemText>
    <ListItemText sx={{flexGrow:"50%",flexBasis:"50%"}}>{moment(flight.start).format('HH:mm')+'-'+moment(flight.end).format('HH:mm')}</ListItemText>
    </Box>
    <ListItemButton onClick={()=>{deleteFlightHandler(flight,index)}} sx={{flexGrow:'0',width:"30px",height:'30px',padding:'0',textAlign:'center',justifyContent:'center'}}><Image alt='delete' fill sizes='30px' src={DeleteIcon}/></ListItemButton>
    

</ListItem>    
)
}
</List>
</CardContent>
</Card>

    </Box>
    <SnackBar {...snackBarProps} />
    </>
  )
}

export default MyFlights