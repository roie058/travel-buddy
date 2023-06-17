
import {TextField} from '@mui/material'
import React from 'react'


import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
    
     return  (day.$d.getTime()-start.getTime())<0
    }

   

  return (
    <Controller 
name={props.name}
control={props.control}
defaultValue={props.value}
render={({ field: { onChange, value }, fieldState: { error } })=>
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
  <DateTimePicker
  disablePast
  shouldDisableDate={disableHandler}
    label={props.label}
    value={value}
    onChange={(newValue) => {
      if(!newValue?.$d){ return onChange(newValue) }
      onChange(newValue.$d)
if(props.onChange){props.onChange(newValue)}
    }}
    renderInput={(params) => <TextField   {...params} helperText={params?.inputProps?.placeholder} />}
  />
</LocalizationProvider>}

/>
  )
}

export default DateTimeInput