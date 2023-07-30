import { Box, CardContent, Typography,Chip, Avatar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import { timeConvert } from '@/util/dateHandlers'

import { Arrow } from '../svgComponents'
import { Result } from './FlightResult'
import { useTranslation } from 'react-i18next'

export type RouteObj={
    airline: string
    bags_recheck_required?: boolean
    cityCodeFrom?: string
    cityCodeTo?: string
    cityFrom: string
    cityTo: string
    combination_id?: string
    equipment?: null
    fare_basis?: string
    fare_category?: string
    fare_classes?:string
    fare_family?: string
    flight_no?: number
    flyFrom: string
    flyTo: string
    guarantee?: boolean
    id?: string
    local_arrival: Date
    local_departure: Date
    operating_carrier?: string
    operating_flight_no?: string
    return: number
    utc_arrival?: Date
    utc_departure?: Date
    vehicle_type?: string
    vi_connection?: boolean
}



type Props = {result:Result}

export const FlightItration=({cityFrom,cityTo,flyFrom,flyTo,routes,duration,departure,arrival}:{departure:Date,arrival:Date,duration:number,cityTo:string,flyTo:string,cityFrom:string,flyFrom:string,routes:RouteObj[]})=>{
    const {t} =useTranslation("flights")
    return(
        <Box sx={{display:"flex",gap:"15px"}} >
<Box  gap={"15px"} display={"flex"} flexDirection={"column"}>
<Typography fontWeight={"bold"}>{dayjs(departure).format("HH:mm") +" "+cityFrom+ "-"+ flyFrom}</Typography> 
<Typography fontWeight={"bold"} display={"flex"} flexWrap={"wrap"}>
<Chip label={timeConvert(duration/60)}/>   
{[...routes.reduce((prv,cur)=>{
return prv.has(cur.airline)? prv: prv.add(cur.airline)},new Set([]))].map((airline)=>
<Avatar key={airline} sx={{display:"inline-block",height:32,width:32}} component={"circle"} alt={airline} src={`https://images.kiwi.com/airlines/64/${airline}.png`} width={32} height={32} /> 
)}
<Chip label={routes.length>1?routes.length-1+" "+t("stops"): t("direct")  } />
</Typography> 
<Typography fontWeight={"bold"}>{dayjs(arrival).format("HH:mm")+" "+cityTo+ "-"+ flyTo}</Typography> 
{dayjs(routes[routes.length-1].local_arrival).diff(routes[0].local_departure,"days")>0&&<Typography color={"GrayText"}>{dayjs(routes[routes.length-1].local_arrival).format("ddd DD MMM")}</Typography> }
</Box>
    </Box>
    )
}

export const FlightFullItration=({city,route}:{route:RouteObj[],city:string})=>{
    const {t} =useTranslation("flights")
    return(
        <Box marginY={"15px"} >
<Typography textTransform={"capitalize"} fontWeight={"bold"} >To {city}</Typography>
{route.map((flight,i)=>
    <Box key={flight.id} sx={{display:"flex",gap:"15px",marginTop:"25px"}} >
<Box   display={"flex"} flexDirection={"column"}>
<Typography fontWeight={"bold"}>{dayjs(flight.local_departure).format("HH:mm") +" "+flight.cityFrom+ "-"+ flight.flyFrom}</Typography> 
<Typography marginBottom={"10px"} color={"GrayText"}>{dayjs(flight.local_departure).format("ddd DD MMM")}</Typography> 
<Typography marginBottom={"10px"} fontWeight={"bold"} display={"flex"} flexWrap={"wrap"}>
<Chip label={timeConvert(dayjs(flight.utc_arrival).diff(flight.utc_departure,"seconds")/60)}/>   
<Avatar sx={{display:"inline-block",height:32,width:32}} component={"circle"} alt={flight.airline} src={`https://images.kiwi.com/airlines/64/${flight.airline}.png`} width={32} height={32} /> 
</Typography> 
<Typography fontWeight={"bold"}>{dayjs(flight.local_arrival).format("HH:mm")+" "+flight.cityTo+ "-"+ flight.flyTo}</Typography> 
<Typography color={"GrayText"}>{dayjs(flight.local_arrival).format("ddd DD MMM")}</Typography> 
{route.length>1&&i!==route.length-1&& <Chip sx={{marginTop:"25px"}} variant="outlined" label={timeConvert(dayjs(route[i+1].utc_departure).diff(flight.utc_arrival,"seconds")/60)+" "+t("stop")} />}
</Box>
    </Box>
)}
        </Box>
    )
}

const ResultCard = ({result}: Props) => {
const [detailes,setDetailes]=useState(false)

const returnRoute=result.route.filter((flight)=>flight.return===1)
const startRoute=result.route.filter((flight)=>flight.return===0)
  return (
     
        <CardContent sx={{display:"flex",marginLeft:"10%",gap:"25px",flexWrap:"wrap",paddingLeft:"0",marginTop:"20px"}}>
{detailes?
 <Box flexWrap={"wrap"} display={"flex"} width={"90%"} gap={"15%"}> 
 <FlightFullItration city={result.cityTo} route={startRoute} />
 {returnRoute.length>0&&<FlightFullItration city={returnRoute[returnRoute.length-1].cityTo} route={returnRoute} />}
 </Box>  :
<>
<FlightItration arrival={result.local_arrival}  departure={result.local_departure} duration={result.duration.departure}  cityFrom={result.cityFrom} cityTo={result.cityTo} flyFrom={result.flyFrom} flyTo={result.flyTo} routes={startRoute} />
{returnRoute.length>0&& <FlightItration arrival={returnRoute[returnRoute.length-1].local_arrival}  departure={returnRoute[0].local_departure}  duration={result.duration.return}   routes={returnRoute} cityFrom={returnRoute[0].cityFrom} cityTo={returnRoute[returnRoute.length-1].cityTo} flyFrom={returnRoute[0].flyFrom} flyTo={returnRoute[returnRoute.length-1].flyTo}  />}

</>
}   
    <Box  display={'flex'} justifyContent={"center"} alignItems={"center"} >
        <IconButton onClick={()=>setDetailes(!detailes)}  ><Arrow transform={detailes? "rotate(270)" :"rotate(90)"} width={20} height={25}/></IconButton>
        </Box>
        </CardContent>
  )
}

export default ResultCard