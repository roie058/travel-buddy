import { Days, Hotel, Plan } from '@/pages/plans/[planId]/schedule'
import React, { useEffect, useState } from 'react'
import DayBar from './DayBar'
import styles from './Day.module.css'

import DayList from './DayList'

import DaySummery from './DaySummery'
import { Grid } from '@mui/material'
import { Flight } from '@/components/flights/AddFlightModal'

import FlightCard from '@/components/flights/FlightCard'
import moment from 'moment'
import { enumerateDaysBetweenDates } from '@/util/dateHandlers'
import HotelCard from '@/components/hotels/HotelCard'

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
  const middleFlights=props.plan.flights.filter((flight)=>flight.position==='other'&&moment(flight.start).dayOfYear()===moment(props.plan.days[props.index].date).dayOfYear())
  setMiddleFlight( middleFlights);
  props.plan.hotels.forEach((hotel)=>{
    const reservationDates=enumerateDaysBetweenDates(hotel.start,hotel.end);
     if(new Set(reservationDates).has(props.day.date)){
    if(reservationDates[reservationDates.length-1]===props.day.date){
      setendHotel(true)
    }
      setHotel(hotel)
     }else{
      console.log('not '+props.day.date)
     }
     

  })
  
}, [props])




  return (
    <Grid   key={props.day.date} item xs={open?12:12} sm={open? 12:4.5} lg={open?12:3.5} >
    <div className={styles.container} >

    
    <div  className={open? styles.dayOpen:styles.day}>
      <DayBar date={day.date} day={day} />
    {props.index!==0&&hotel &&<HotelCard    listItem={hotel?.place}  />}  
 {startFlight&&props.index===0 && <FlightCard flight={startFlight}/>}     
 
<DayList position='rutine' date={props.index} flights={(middleFlight&&middleFlight.length>0)?middleFlight:undefined}  list={day.rutine}  /> 


{endFlight&&props.index===props.plan.days.length-1 ? <FlightCard flight={endFlight}/> :<HotelCard listItem={endHotel? undefined  :hotel?.place}/>}
 </div>
 
{open&&



  <DaySummery   index={props.index} start={props.index===0 &&startFlight? startFlight.destination : props.index!==0&&hotel?hotel.place:undefined } end={endFlight&&props.index===props.plan.days.length-1 ?endFlight.origin:endHotel?undefined:hotel?.place} day={props.day}/>

}
<div onClick={openHandler} className={open?styles.daySummeryFliped:styles.daySummery}/>


</div> 
</Grid>
  )
}

export default Day