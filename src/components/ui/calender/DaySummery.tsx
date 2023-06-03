
import { Flight } from '@/components/flights/AddFlightModal'
import { PlanContext } from '@/context/plan-context'
import { IPlace } from '@/dummyData'

import {  Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'

import GoogleMapReact from 'google-map-react'
import Image from 'next/image'


import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { RoutineItem } from './DayList'
import { Days } from '@/components/pageCompnents/Schedule'
import moment from 'moment'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

type Props = {day:Days,index:number,start?:Flight["destination"]|IPlace,end?:Flight["origin"]|IPlace}

const reduced=(array:RoutineItem[])=>{
    const  budget=array.reduce((prev,cur)=>{
      return prev+cur?.budget
    },0)
    return budget
}

function isPlace(selected: IPlace|Flight['destination']): selected is IPlace {
  return (selected as IPlace).latitude !== undefined;
}

const DaySummery = (props: Props) => {
  const  [diractionArr,setDiractionsArr]=useState< google.maps.DirectionsRoute | undefined>()
  const  [budget,setBudget]=useState<Number>(reduced(props.day.rutine))
  const  [mapRef,setMapRef]=useState<any>()
  const  [mapsRef,setMapsRef]=useState<any>()
const {t}=useTranslation("day")
  const  [dailyBudget,setDailyBudget]=useState<Number>()
  const [defaultLocation,setDefaultLocation]=useState<{lat:number,lng:number}>()
  const [weather,setWeather]=useState<{rainProb:string,icon:string,temp:string,weatherType:string}>(props.day.weather)
  const [liveWeather,setLiveWeather]=useState<{rainProb:string,icon:string,temp:string,weatherType:string}>()
  const cardRef=useRef<HTMLDivElement | null>(null)
const planCtx=useContext(PlanContext)
const [, updateState] = useState<any>();
const forceUpdate = useCallback(() => updateState({}), []);
const currency=planCtx.plan?.budget?.currency??"$"
const {locale}=useRouter()
useEffect(()=>{
const getDefaultLocation=async ()=>{
  const geo=new google.maps.Geocoder()
const res =await geo.geocode({address:planCtx?.plan.country})
  setDefaultLocation({lat:res.results[0].geometry.location.lat(),lng:res.results[0].geometry.location.lat()})

}

const setNewWeather=async()=>{
  
  if(props.start&& isPlace(props.start) ){
try {
  const {data}=  await axios.get("/api/weather/getWeather",{params:{locale,planId:planCtx?.plan._id,index:props.index,location:`${props.start?.latitude},${props.start?.longitude}`}})
  setWeather(data.weather);
  setLiveWeather(data.liveWeather)
} catch (error) {
  
}}else if(props.start&& !isPlace(props.start)){
  try {
  const {data}=  await axios.get("/api/weather/getWeather",{params:{locale,planId:planCtx?.plan._id,index:props.index,location:`${props.start?.lat},${props.start?.lng}`}})
  setWeather(data.weather);
  setLiveWeather(data.liveWeather)
} catch (error) {
  
}
}else if(props.day.rutine.length>0){
  try {
    const {data}=await axios.get("/api/weather/getWeather",{params:{planId:planCtx?.plan._id,index:props.index,location:`${props.day.rutine[0].place.latitude},${props.day.rutine[0].place.longitude}`}})
 setWeather(data.weather);
 setLiveWeather(data.liveWeather)
 
  } catch (error) {
    
  }

}else {return}

}

setNewWeather()
getDefaultLocation()
const totalDayBudget=Math.round((planCtx.plan.budget.budget - 
  planCtx.plan.hotels.reduce((prv,cur)=>{return prv+ ((moment(cur.end).dayOfYear() - moment(cur.start).dayOfYear())*cur.nightPrice)},0) -
   planCtx.plan.flights.reduce((prv,cur)=>{return prv+ cur.price},0)-planCtx.plan.budget.expenses.reduce((prv,cur)=> prv+cur.price ,0)-planCtx.plan.budget.transportation.reduce((prv,cur)=> prv+cur.price ,0) )
/ planCtx.plan.days.length)
setDailyBudget(totalDayBudget)

  cardRef.current?.scrollIntoView({ behavior:"smooth" })

if(mapRef&&mapsRef){
  apiIsLoaded(mapRef,mapsRef)
}
  

},[planCtx,props.day.rutine])

const apiIsLoaded = (map:any, maps:any) => {

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

// const newMap=new google.maps.Map()
  directionsRenderer.setMap(map);
  let origin;
  let destination;
  let  wayp=props.day.rutine.map((item)=>{

   return {location:{lat:Number(item.place.latitude),lng:Number(item.place.longitude)}}
     })

  if(props.start&& isPlace(props.start)){
   origin = { lat: Number(props.start?.latitude), lng: Number(props.start?.longitude) };
  }else if(props.start&& !isPlace(props.start)){
   origin = { lat: Number(props.start?.lat), lng: Number(props.start?.lng) };
  }else{
   origin = { lat: Number(props.day?.rutine[0]?.place.latitude), lng: Number(props.day?.rutine[0]?.place.longitude) };
 wayp.shift()
 }
  if(props.end&&isPlace(props.end)){
   destination = { lat:Number(props.end?.latitude),lng: Number( props.end?.longitude) };
  }else if(props.end&& !isPlace(props.end)){
   destination = { lat:Number(props.end?.lat),lng: Number( props.end?.lng) };
  } else{
   destination = { lat: Number(props.day?.rutine[props.day?.rutine.length-1]?.place.latitude), lng: Number(props.day?.rutine[props.day?.rutine.length-1]?.place.longitude) };
   wayp.pop()
 }
  
  directionsService.route(
    {
      origin: origin,
      destination: destination,
      waypoints:wayp,
      travelMode: google.maps.TravelMode.DRIVING
   },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        
        directionsRenderer.setDirections(result);

       setDiractionsArr(result?.routes[0])
      } else {
        console.error(`error fetching directions ${result}`);
      }
    }
  );
};
    

  


       const isMobile=useMediaQuery('(max-width:800px)')

  return (
    <Paper ref={cardRef}   elevation={3} sx={{width:'100%',minHeight:'min-content'}}>
{weather&&<Box   display={'flex'} justifyContent="space-evenly" flexWrap={"wrap"} >
 <Box display={'flex'} alignItems={'center'} justifyContent="center" gap={1}>
  <Image width={35} height={35} alt={'weather'} src={`/images/weatherIcons/${weather.icon}.svg`}/>
<Typography  >{weather.temp}c°, {weather.rainProb}%💧, {weather.weatherType} </Typography>
</Box>
{liveWeather&&<Box display={'flex'} alignItems={'center'} justifyContent="center" gap={1}>
<Typography  >Live </Typography>
  <Image width={30} height={30} alt={'weather'} src={`/images/weatherIcons/${liveWeather.icon}.svg`}/>
<Typography  >{liveWeather.temp}c°, {liveWeather.rainProb}%💧, {liveWeather.weatherType} </Typography>
</Box>}


</Box>}


        <Box   sx={{width:'100%',height:"30vh"}}>  
{defaultLocation&& props.day&&
  <GoogleMapReact key={`${props.day.rutine}`}  bootstrapURLKeys={{key:'AIzaSyB_5RyNMBak3lrK10q9-dyPHWbOM8XKaKw'}}
defaultZoom={6} center={defaultLocation??{lat:31.8943,lng:-81.7198}} yesIWantToUseGoogleMapApiInternals
onGoogleApiLoaded={({ map, maps }) =>{setMapRef(map);
  setMapsRef(maps);  return apiIsLoaded(map, maps)}}>

</GoogleMapReact>
}

</Box>
<Box >
 {diractionArr&& <Table  size={isMobile?"small":'medium'} {...isMobile? {padding:"none"}:''} >
        <TableHead  ><TableRow >
            <TableCell  sx={{fontSize:!isMobile?"initial":'0.7rem'}}>{t("origin")}</TableCell>
            <TableCell sx={{fontSize:!isMobile?"initial":'0.7rem'}}>{t("destination")}</TableCell>
            <TableCell sx={{fontSize:!isMobile?"initial":'0.7rem'}}>{t("travelTime")}</TableCell>
            <TableCell sx={{fontSize:!isMobile?"initial":'0.7rem'}}>{t("distance")}</TableCell>
            </TableRow></TableHead>
        <TableBody>
{ diractionArr.legs.map((leg)=>{
  return  <TableRow key={leg.start_address+leg.end_address}>
<TableCell sx={{fontSize:!isMobile?"initial":'0.6rem'}} >{leg.start_address}</TableCell>
<TableCell sx={{fontSize:!isMobile?"initial":'0.6rem'}} >{leg.end_address}</TableCell>
<TableCell sx={{fontSize:!isMobile?"initial":'0.6rem'}} >{leg.duration?.text}</TableCell>
<TableCell sx={{fontSize:!isMobile?"initial":'0.6rem'}} >{leg.distance?.text}</TableCell>
    </TableRow>
     
})}

        </TableBody>
    </Table>}
    <Table >
    <TableHead><TableRow>
            <TableCell></TableCell>
            <TableCell>{t("current")}</TableCell>
            <TableCell>{t("daily")}</TableCell>
            <TableCell>{t("diff")}</TableCell>
            
            </TableRow></TableHead>
        <TableBody>
            <TableRow>
                <TableCell>{t("budget")}</TableCell>
                <TableCell>{String(budget)+currency}</TableCell>
                <TableCell>{String(dailyBudget)+currency}</TableCell>
                <TableCell sx={{color:Number(dailyBudget) < Number(budget)?'red':'green'}} >{String(Number(dailyBudget)-Number(budget))+currency}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
</Box>
    </Paper>
  )
}

export default DaySummery