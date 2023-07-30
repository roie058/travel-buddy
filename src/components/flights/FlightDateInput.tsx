
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {TextField} from '@mui/material'
import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
type Props = {
label:string
name:string
start?:string,
end?:string
value?:string,
control:any
onChange?:(value:any,name:string)=>void
}


const FlightDateInput = (props: Props) => {
  

  const disableHandler=(day:any)=>{
    if(!props.start)return false;
    const start=dayjs(props.start,'DD/MM/YYYY')
    
  if( start.diff(day,'day')===0){return false}    
    
    if(!props.end){
      return  day.diff(start,'day')<=0
    }else{    
const end=dayjs(props.end,'DD/MM/YYYY')
 return !day.isBetween(start,end);
    }
    }

   

  return (
    <Controller 
name={props.name}
control={props.control}
rules={{
    required:false,
    validate:
    {value:
        (value,formValues)=>{
            if(props.name==='start'&&formValues.end)
            {        
                return dayjs(value,"DD/MM/YYYY").isBefore(dayjs(formValues.end,"DD/MM/YYYY"))
            }else if(props.name==='end'&&formValues.end)
            {
          return dayjs(value,"DD/MM/YYYY").isAfter(dayjs(formValues.start,"DD/MM/YYYY"))
            } 
            else{
                return true
            }}
        }}}
render={({ field: { onChange, value }})=>
{
  return (  <LocalizationProvider  dateAdapter={AdapterDayjs} >
  <DatePicker
  
  inputFormat='DD/MM/YYYY'
  disablePast
  
  shouldDisableDate={disableHandler}
    label={props.label}
    value={dayjs(value,"DD/MM/YYYY")}
    onChange={(newValue) => {
        
        if(!newValue?.$d){ return onChange(newValue) }
      onChange(newValue)
props.onChange(newValue,props.name)
    }}
    renderInput={(params) => <TextField  {...params} />}
    
  />
</LocalizationProvider>)}}

/>
  )
}

export default FlightDateInput