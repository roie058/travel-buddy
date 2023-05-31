

import { Days } from '@/components/pageCompnents/Schedule'
import { Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import Image from 'next/image'
import React,{ useState} from 'react'
import styles from './Day.module.css'
import { Arrow, RightArrow } from '@/components/svgComponents'
import { useRouter } from 'next/router'

type Props = {
  date:string,
  day:Days
  openHandler:()=>void
  open:boolean
}

const weekDay=(day:string,locale:string)=>{
  
  
  const date=moment(new Date(day))
  let weekDays=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
if(locale==="he"){
  weekDays=["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
}


  
  return weekDays[date.weekday()]
}



const DayBar = (props: Props) => {
const {locale}=useRouter()
const[dayOfWeek,setDayOfWeek ]=useState(weekDay(props.date,locale))
const[day,setDay ]=useState(props.date.split('/')[1])

const mdScreen=useMediaQuery('(max-width:1200px)')


  return (
    <Box display={'flex'}  alignItems='center' color={'#575757'}  justifyContent="space-between" height={'40px'} sx={{backgroundColor:'white' ,width:'100%'}}>
      <Box display={'flex'}  gap={1} paddingLeft={3} >
           <Typography fontWeight='bold' fontSize={mdScreen?'0.8rem':'1rem'} variant='h3'>{day}</Typography>
      <Typography fontWeight='bold'  fontSize={mdScreen?'0.8rem':'1rem'} variant='h3'>{dayOfWeek}</Typography>

      </Box>
      <Box display={'flex'}  gap={1} paddingRight={3} >
      <div style={{display:'flex',gap:'3px',alignItems:'center'} }>
      {<Image alt='weather' width={mdScreen?35:35} height={mdScreen?35:35} src={props.day.weather?.icon?`/images/weatherIcons/${props.day.weather?.icon}.svg`:''}/>}
      <Typography fontSize={mdScreen? '0.8rem':'1rem'} fontWeight="bold" variant='h3'>{props.day.weather?props.day.weather.temp:18}c°</Typography>
      </div>
      <div onClick={props.openHandler} className={styles.daySummery}>
      {props.open?<RightArrow width={"24px"} height={"24px"}/>:<Arrow width={"24px"} height="24px"  />}

      </div>
      </Box>
    </Box>
  )
}

export default DayBar