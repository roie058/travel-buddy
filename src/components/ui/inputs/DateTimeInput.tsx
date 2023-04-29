import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {TextField} from '@mui/material'
import React, { Ref } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
type Props = {
label:string
name:string
start?:Date,
value?:Date,
control:any
onChange?:(value:any)=>void
}


const DateTimeInput = (props: Props) => {
  

  const disableHandler=(day:any)=>{
    if(!props.start)return false;
    const start=new Date(props.start)
    
     return  (day._d.getTime()-start.getTime())<0
    }

   

  return (
    <Controller 
name={props.name}
control={props.control}
defaultValue={props.value}
render={({ field: { onChange, value }, fieldState: { error } })=>
    <LocalizationProvider  dateAdapter={AdapterMoment}>
  <DateTimePicker

  disablePast
  shouldDisableDate={disableHandler}
    label={props.label}
    value={value}
    onChange={(newValue) => {
      if(!newValue?._d){ return onChange(newValue) }
      onChange(newValue._d)
if(props.onChange){props.onChange(newValue)}
    }}
    renderInput={(params) => <TextField   {...params} helperText={params?.inputProps?.placeholder} />}
  />
</LocalizationProvider>}

/>
  )
}

export default DateTimeInput