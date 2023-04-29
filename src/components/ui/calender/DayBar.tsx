
import { Days } from '@/pages/plans/[planId]/schedule'
import { Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import Image from 'next/image'
import React,{ useState} from 'react'


type Props = {
  date:string,
  day:Days
}

const weekDay=(day:string)=>{
  
  
  const date=moment(new Date(day))
  
  const weekDays=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  
  return weekDays[date.weekday()]
}



const DayBar = (props: Props) => {
const[dayOfWeek,setDayOfWeek ]=useState(weekDay(props.date))
const[day,setDay ]=useState(props.date.split('/')[1])

const mdScreen=useMediaQuery('(max-width:1200px)')


  return (
    <Box display={'flex'} marginBottom="3%" alignItems='center' color={'#575757'}  justifyContent='space-evenly' height={'40px'} sx={{backgroundColor:'white' ,width:'calc(100% - 2px)',borderRadius:'30px'}}>
      <div style={{display:'flex',gap:'3px',alignItems:'center'} }>
      {<Image alt='weather' width={mdScreen?30:40} height={mdScreen?30:40} src={props.day.weather?.icon?`/images/weatherIcons/${props.day.weather?.icon}.svg`:'/images/weather.svg'}/>}
      <Typography fontSize={mdScreen? '1rem':'1.3rem'} fontWeight="bold" variant='h3'>{props.day.weather?props.day.weather.temp:18}c°</Typography>
      </div>
      <Typography fontWeight='bold'  fontSize={mdScreen?'1rem':'1.3rem'} variant='h3'>{dayOfWeek}</Typography>
      <Typography fontWeight='bold' fontSize={mdScreen?'1rem':'1.5rem'} variant='h3'>{day}</Typography>
      
    </Box>
  )
}

export default DayBar