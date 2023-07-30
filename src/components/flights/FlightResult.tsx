import { Box, Card, Typography, Button, CircularProgress, AlertColor } from '@mui/material'
import React, { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { addNewFlight } from '@/util/fetchers'
import ResultCard, { RouteObj } from './ResultCard'
import { Plan } from '../pageCompnents/Schedule'

import { queryClient } from '@/pages/_app'
import { useTranslation } from 'react-i18next'
import AddFlightModal from './AddFlightModal'


export type Result={
    airlines: string[],
    availability: {seats: number|null},
    baglimit: {hand_height: number, hand_length: number, hand_weight: number, hand_width: number, hold_dimensions_sum: number, hold_height:number,hold_length:number, hold_weight:number, hold_width:number,personal_item_height:number,personal_item_length:number,personal_item_weight:number,personal_item_width:number}
    bags_price: {1: number, 2: number}
    booking_token: string
    cityCodeFrom: string
    cityCodeTo: string
    cityFrom: string
    cityTo: string
    conversion: {EUR: number}
    countryFrom: {code: string, name: string}
    countryTo: {code: string, name: string}
    deep_link: string
    distance: number
    duration: {departure: number, return: number, total: number}
    facilitated_booking_available: boolean
    fare: {adults: number, children: number, infants: number}
    flyFrom: string
    flyTo : string
    has_airport_change: boolean
    hidden_city_ticketing: boolean
    id: string
    local_arrival: Date
    local_departure: Date
    nightsInDest: number
    pnr_count: number
    price: number
    quality: number
    route:  RouteObj[]
    technical_stops: number
    throw_away_ticketing: boolean
    utc_arrival: Date
    utc_departure: Date
    virtual_interlining: boolean
}

type Props = {result:Result,currency:string,plan:Plan|Plan[],setSnackBar:(message: string, severity: AlertColor) => void}



const FlightResult = ({result,currency,plan,setSnackBar}: Props) => {
const [open, setOpen] = useState(false)
  
  const {t}=useTranslation("flights")
  function isPlan(selected: Plan|Plan[]): selected is Plan {
    return (selected as Plan)._id !== undefined;
  }
  let addedList
if(isPlan(plan)){
  addedList=new Set(plan?.flights.map((flight)=>flight?.flightId))
}else{
  addedList=new Set(plan.flatMap((plan)=>(plan.flights.map((flight)=>flight?.flightId))))
}


const {mutate,isLoading}=useMutation({
    mutationFn:addNewFlight,
    onMutate:({flight}:{flight:Result,planId:string})=>{
addedList.add(flight.id)
    },
    onError:()=>{
      setSnackBar(t("error"),"error")
    },
    onSuccess:()=>{
if(isPlan(plan)){
  queryClient.refetchQueries(["plan",plan._id])
}else{
  queryClient.refetchQueries(["plans"])
}
setSnackBar(t("snack.saved"),"success")
    }
})

const saveFlight=()=>{
  if(isPlan(plan)){
    mutate({flight:result,planId:plan._id})
  }else{
setOpen(true)
  }
} 



  return (
    <>
    {!isPlan(plan)&&<AddFlightModal plans={plan} flight={result} open={open} onClose={()=>setOpen(false)} setSnackBar={setSnackBar}  />}
    <Card sx={{marginX:"10%",marginY:"15px"}} >
       
        
    <ResultCard result={result} />
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} marginBottom={5} >
<Typography sx={{marginLeft:"10%"}} fontSize={"2rem"} variant="h4">{result.price+currency}</Typography>

<Box display={"flex"}>
<Button  sx={{width:"20%",marginLeft:"10%",marginRight:"10px",textTransform:"capitalize"}} color="info" variant="contained" href={result.deep_link} target='_blank' >{t("book")}</Button>
{addedList && addedList.has(result.id)? <Button disabled   variant="outlined" >{t("saved")}</Button>   :<> {isLoading? <CircularProgress  /> :<Button   variant="outlined" onClick={saveFlight}>+</Button>}</>}
</Box>
</Box>
    </Card>
    </>
  )
}

export default FlightResult