
import React, { useEffect, useState } from 'react'
import DayBar from './DayBar'
import styles from './Day.module.css'

import DayList from './DayList'

import DaySummery from './DaySummery'
import { Box } from '@mui/material'
import { Flight } from '@/components/flights/AddFlightModal'

import FlightCard from '@/components/flights/FlightCard'
import dayjs from 'dayjs'
import { enumerateDaysBetweenDates } from '@/util/dateHandlers'
import HotelCard from '@/components/hotels/HotelCard'
import { Days, Hotel, Plan } from '@/components/pageCompnents/Schedule'

type Props = {day:Days,index:number,plan:Plan}

const Day = (props: Props) => {
const [day,setDay] = useState<Days>(props.day)
const [open, setOpen] = useState(false)
const [startFlight, setStartFlight] = useState<Flight>()
const [endFlight, setEndFlight] = useState<Flight>()
const [hotel, setHotel] = useState<Hotel>()
const [endHotel, setendHotel] = useState<boolean>(false)

const [middleFlight, setMiddleFlight] = useState<Flight[]>()




const openHandler=()=>{
  if(open){
    setOpen(false)
  }else{
    setOpen(true)
   
    
    }
  }
  
    
   


useEffect(() => {
  setDay(props.day)
  setStartFlight( props.plan.flights.find((flight)=>flight.position ==='start'))
  setEndFlight( props.plan.flights.find((flight)=>flight.position ==='end'))
  const middleFlights=props.plan.flights.filter((flight)=>flight.position==='other'&&dayjs(flight.start).diff(props.plan.days[props.index].date,'day')==0)
  setMiddleFlight( middleFlights);
  props.plan.hotels.forEach((hotel)=>{
    const reservationDates=enumerateDaysBetweenDates(hotel.start,hotel.end);
     if(new Set(reservationDates).has(props.day.date)){
    if(reservationDates[reservationDates.length-1]===props.day.date){
      setendHotel(true)
    }
      setHotel(hotel)
     }else{

     }
     

  })
  
}, [props])




  return (
  
      <Box key={props.day.date} flexGrow={1} order={open?1:'initial'} flexBasis={open? '100%' :1} display={"flex"} justifyContent={"center"}>
    <div className={styles.container} >

    
    <div  className={open? styles.dayOpen:styles.day}>
    <Box width={'100%'}>
      <DayBar open={open} openHandler={openHandler} date={day.date} day={day} />
    {props.index!==0&&hotel &&<HotelCard    listItem={hotel?.place}  />}  
 {startFlight&&props.index===0 && <FlightCard flight={startFlight}/>}     
 </Box>
<DayList plan={props.plan}  position='rutine' date={props.index} flights={(middleFlight&&middleFlight.length>0)?middleFlight:undefined}  list={day.rutine}  /> 

<Box width={"100%"} marginTop={'auto'}>

{endFlight&&props.index===props.plan.days.length-1 ? <FlightCard flight={endFlight}/> :<HotelCard listItem={endHotel? undefined  :hotel?.place}/>}
</Box>

 </div>
 
{open&&
  <DaySummery  plan={props.plan}  index={props.index} start={props.index===0 &&startFlight? startFlight.destination : props.index!==0&&hotel?hotel.place:undefined } end={endFlight&&props.index===props.plan.days.length-1 ?endFlight.origin:endHotel?undefined:hotel?.place} day={props.day}/>
}


</div> 
</Box>

  )
}

export default Day