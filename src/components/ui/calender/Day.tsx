
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
const [startHotel, setStartHotel] = useState<Hotel>()
const [endHotel, setEndHotel] = useState<Hotel>()

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
  setStartFlight( props.plan.flights.find((flight)=>flight.position ==='start'&&flight.booked))
  setEndFlight( props.plan.flights.find((flight)=>flight.position ==='end'&&flight.booked))
  const middleFlights=props.plan.flights.filter((flight)=>flight.position==='other'&&flight.booked&&dayjs(flight.departure).diff(dayjs(props.plan.days[props.index].date,{format:"DD/MM/YYYY"}),'day')==0)
  setMiddleFlight( middleFlights);
  props.plan.hotels.forEach((hotel)=>{
    const reservationDates=enumerateDaysBetweenDates(hotel.start,hotel.end);
     if(new Set(reservationDates).has(props.day.date)){
      if(reservationDates[0]===props.day.date||reservationDates[reservationDates.length-1]!==props.day.date){
        setEndHotel(hotel)
      }else{
        setStartHotel(hotel)
      }
      
     }

  })
  
}, [props])




  return (
  
      <Box key={props.day.date} flexGrow={1} order={open?1:'initial'} flexBasis={open? '100%' :1} display={"flex"} justifyContent={"center"}>
    <div className={styles.container} >

    
    <div  className={open? styles.dayOpen:styles.day}>
    <Box width={'100%'}>
      <DayBar open={open} openHandler={openHandler} date={day.date} day={day} />
    {props.index!==0&&startHotel &&<HotelCard    listItem={startHotel?.place}  />}  
 {startFlight&&props.index===0 && <FlightCard flight={startFlight}/>}     
 </Box>
<DayList plan={props.plan}  position='rutine' date={props.index} flights={(middleFlight&&middleFlight.length>0)?middleFlight:undefined}  list={day.rutine}  /> 

<Box width={"100%"} marginTop={'auto'}>

{endFlight&&props.index===props.plan.days.length-1 ? <FlightCard flight={endFlight}/> :<HotelCard listItem={endHotel? endHotel.place  :undefined}/>}
</Box>

 </div>
 
{open&&
  <DaySummery  plan={props.plan}  index={props.index} start={props.index===0 &&startFlight? startFlight.destination : props.index!==0&&startHotel?startHotel.place:undefined } end={endFlight&&props.index===props.plan.days.length-1 ?endFlight.origin:endHotel?endHotel?.place:undefined} day={props.day}/>
}


</div> 
</Box>

  )
}

export default Day