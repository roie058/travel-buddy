
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {TextField} from '@mui/material'
import React from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
type Props = {
label:string
name:string
control:any
onChange?:(value:any)=>void
}


const MonthInput = (props: Props) => {
  
  return (
    <Controller 
name={props.name}
control={props.control}
rules={{required:'This field is required'}}
render={({ field: { onChange, value } })=>
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
  <DatePicker
  inputFormat='MMMM YYYY'
  views={['month', 'year']}
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

export default MonthInput