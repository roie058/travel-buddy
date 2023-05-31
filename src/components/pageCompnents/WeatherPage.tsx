import { Box, Card,  CardActions, CardContent, CardHeader, CircularProgress, FormControl, List, ListItem, ListItemIcon, ListItemText, TextField, Typography, useMediaQuery } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Autocomplete, LoadScriptNext } from '@react-google-maps/api'
import moment from 'moment'
import React, { useState } from 'react'

import axios from 'axios'
import Image from 'next/image'
import UiButton from '../ui/buttons/UiButton'
import { useTranslation } from 'next-i18next'

type hour={
    cloudcover: number
conditions: string;
datetime: string;
datetimeEpoch: number
dew: number
feelslike: number
humidity: number
icon: string;
precip: number
precipprob: number
preciptype: string|null
pressure: number
severerisk: number
snow: number
snowdepth: number
solarenergy: null
solarradiation: number
source: string;
stations: string[]
temp: number
uvindex: number
visibility: number
winddir: number
windgust: number
windspeed: number;
}


type Weather= {
    cloudcover: number;
    conditions: string ;
    datetime: string;
   datetimeEpoch: number;
    description: string;
dew: number ;
 feelslike: number; 
    feelslikemax:number;
    feelslikemin:number;
    hours : Array<hour>
    humidity: number;
    icon: string
    moonphase :  number;
 precip : number;
  precipcover :number;
    precipprob :number;
    preciptype :  string|null
    pressure: number;
severerisk: number;
    snow:number;
    snowdepth :number;
    solarenergy :number;
    solarradiation:  number;
    source: string;
    stations: string[];
    sunrise:  string;
    sunriseEpoch :  number;
    sunset: string;
    sunsetEpoch: number;
    temp:  number;
    tempmax: number;
    tempmin: number;
    uvindex:number;
    visibility: number;
    winddir : number;
    windgust :  number;
    windspeed :  number;
}


type Props = {}
const libraries:Array<"places" | "drawing" | "geometry" | "localContext" | "visualization">=['places']
const WeatherPage = (props: Props) => {
const [startDate,setStartDate]=useState(new Date())
const [endDate,setEndDate]=useState(new Date())
const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>()
const [location, setLocation] = useState<{lat:number,lng:number}>()
const [isLoading, setIsLoading] = useState(false)
const [days, setDays] = useState<Weather[]>()
const {t}=useTranslation("form")
const onLoad=(autoC: google.maps.places.Autocomplete)=>{ setAutocomplete(autoC)}

const onPlaceChanged=()=>{
const lat=autocomplete?.getPlace().geometry?.location?.lat()
const lng=autocomplete?.getPlace().geometry?.location?.lng()
setLocation({lng,lat})


}

const onClickHandler=async()=>{
if(endDate&&startDate&&location){
    setIsLoading(true)
   const {data} =await axios.get("/api/weather/getWeatherByDates",{params:{start:startDate,end:endDate,location:`${location.lat},${location.lng}`}})
if(data.success){
    console.log(data);
    setDays(data.weather)
}
}
setIsLoading(false)
}

const isMobile=useMediaQuery("(max-width:600px)")

  return (
    <>
   {libraries && <LoadScriptNext libraries={libraries} googleMapsApiKey={`${process.env.MAPS_API_KEY}`}>
    <main style={{width:'100%',justifyContent:"space-evenly"}}>
        
        <Card sx={{margin:'10% 10% 0% 10%', minWidth:'80%' }}>
<CardHeader title={t("weather.header")}/>
<LocalizationProvider dateAdapter={AdapterMoment}>
<FormControl fullWidth>
<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} ><TextField fullWidth /></Autocomplete>
</FormControl>
<Box width={"100%"} display={"flex"}>
<FormControl fullWidth >
<DatePicker inputFormat='DD/MM/YYYY' onChange={(e:any)=>{setStartDate(e._d); setEndDate(e._d)} } value={startDate} renderInput={(props)=><TextField  label={'Start'} {...props}  />}/>
</FormControl>
<FormControl fullWidth >
<DatePicker shouldDisableDate={(date:any)=>{ return(startDate.getTime()>date._d.getTime() )} } inputFormat='DD/MM/YYYY' onChange={(e)=>setEndDate(e._d)} value={endDate} renderInput={(props)=><TextField label={'End'} {...props}  />}/>
</FormControl>
</Box>
</LocalizationProvider>
<CardActions sx={{display:'flex',justifyContent:'center',maxWidth:isMobile? "100%":'60%',margin:isMobile?'0':'0 20%'}}>
{isLoading? <CircularProgress size={'1rem'}/>  : <UiButton  clickFn={onClickHandler} color='blue'>{t("weather.btn")}</UiButton>}
</CardActions>



        </Card>
        <List sx={{width:'80%',minWidth:'80%',display:'flex',flexWrap:'wrap',justifySelf:'center'}} >
{days&& days.map((day)=>{
    return <Card key={day.datetimeEpoch}  sx={{display:'flex',flexGrow:'1',flexDirection:'column', alignItems:'center',margin:'3px',width:"100%%"}} >

<ListItem  >

        <ListItemIcon ><Image alt={day.icon} width={isMobile? 50:100} height={isMobile? 50:100} src={`/images/weatherIcons/${day.icon}.svg`}/> </ListItemIcon>
        <ListItemText  >{<Typography fontSize={isMobile?'1.5rem' : "2rem"} variant="h4">{`${day.tempmax}/${day.tempmin}c°`}</Typography>} </ListItemText>
        <ListItemText >{<Typography fontSize={isMobile?'1.2rem' : "1.5rem"} variant="h5">{moment(day.datetime).format('DD.MM.YY')}</Typography>} </ListItemText>
        </ListItem>
        <Typography fontSize={isMobile?'1.5rem' : "2rem"}  variant="h4" >{day.conditions}</Typography>
        <CardContent sx={{width:'80%'}}>
       
            <Typography fontSize={isMobile?'0.8rem' : "1rem"}  >{day.description}</Typography>
           <Box display={"flex"} justifyContent={"space-between"}>
           <Typography fontSize={isMobile?'0.8rem' : "1rem"} >{t("weather.sunrise")}: {day.sunrise}</Typography>
            <Typography fontSize={isMobile?'0.8rem' : "1rem"} >{t("weather.sunset")}: {day.sunset}</Typography>
           </Box>
           <Box display={"flex"} justifyContent={"space-between"}>
            <Typography fontSize={isMobile?'0.8rem' : "1rem"} >{day.humidity}% {t("weather.humidity")}</Typography>
            <Typography fontSize={isMobile?'0.8rem' : "1rem"} >{day.precipprob}% {t("weather.rainProb")}</Typography>
            <Typography fontSize={isMobile?'0.8rem' : "1rem"} >{day.uvindex} {t("weather.uv")}</Typography>
            </Box>
            <Typography>{}</Typography>
        </CardContent>
        </  Card>
})}
 </List>
    </main>
    </LoadScriptNext>}
    </>
  )
}

export default WeatherPage