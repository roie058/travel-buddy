
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
start?:Date,
end?:Date
value?:Date,
control:any
hotel?:boolean,
onChange?:(value:any)=>void
}


const DateInput = (props: Props) => {
  

  const disableHandler=(day:any)=>{
    if(!props.start)return false;
    const start=dayjs(props.start)
    
  if( start.diff(day,'day')===0){return false}    
    
    if(!props.end){
      return  dayjs(day.$d).diff(start,'day')<=0
    }else{    
const end=dayjs(props.end)
 return !day.isBetween(start,end);

    }
    }

   

  return (
    <Controller 
name={props.name}
control={props.control}
rules={{required:'This field is required',validate:{value:(value,formValues)=>{if(props.name==='start'&&formValues.end!==''){return value<=formValues.end}else if(props.name==='end'){value>=formValues.end } else{return true}}}}}
render={({ field: { onChange, value }, fieldState: { error } })=>
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
  <DatePicker
  inputFormat='DD-MM-YYYY'
  disablePast={!props.hotel}
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

export default DateInput