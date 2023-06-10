import {Autocomplete,  Card, CardContent, CardHeader, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { Box } from '@mui/system'

import React, { ChangeEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form'
import UiButton from '../ui/buttons/UiButton'
import DateTimeInput from '../ui/inputs/DateTimeInput'
import airLines from '../../util/airLines.json'
import airports from '../../util/airports.json'
import axios from 'axios'
import AddFlightModal, { Flight } from './AddFlightModal'


import Image from 'next/image'
import { Plan } from '../pageCompnents/Schedule'
import useSnackBar from '@/hooks/useSnackBar'
import SnackBar from '../ui/SnackBar'
import ToolTip from '../ui/ToolTip'
import { useTranslation } from 'next-i18next'
import { useMutation } from '@tanstack/react-query'
import { addNewFlight } from '@/util/fetchers'
import { queryClient } from '@/pages/_app'

type Props = {plan?:Plan,plans?:Plan[]}

const allAirlines=Object.keys(airLines).map((id)=>airLines[id])

function getAirportLocation(iata:string){
const newAirports=JSON.parse(JSON.stringify(airports))
    for (const property in newAirports) {
        if(newAirports[property].iata == iata ){
           return {lat:newAirports[property].lat,lng:newAirports[property].lon}
        
      }
    }
    return;
}



const FlightAdd = (props: Props) => {
    const {register,control,setError,handleSubmit,setValue,formState}=useForm({defaultValues:{start:new Date(),end:new Date(),airline:'',destination:"",origin:'',flightNumber:"",position:'',price:0}})
const [airportsData,setAirportsData]=useState<Array<{name:string,iata:string}>>([])
const {setSnackBar,snackBarProps}=useSnackBar()
const [open, setOpen] = useState(false)

const [flightData, setFlightData] = useState<Flight>()
const{t}=useTranslation("flights")

const {mutate,isLoading}=useMutation(addNewFlight,{onSuccess:(data,{planId})=>{
    setSnackBar(t("snack.added"),'success')
queryClient.invalidateQueries(["plan",planId])

}})

const autoCompleteHandler:ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>=async(e)=>{   
const {data} =await axios.get(`https://airport-autosuggest.flightright.net/v1/airports/COM?name=${e.target?.value}`)
setAirportsData(data)
}

const changeHandler=async(inputName:'origin'|'destination'|'airline',value: {
    name: string;
    iata: string;
} | null)=>{ 
    if(value){
    let newValue:any=value  
    if(inputName!=='airline'){
    const  airportLocation=getAirportLocation(value.iata);
newValue={...value,...airportLocation}
    }
    
        setValue(inputName,newValue) 
        setAirportsData([])
    }else return;
    }


const onClose=()=>{
    setOpen(false)
}

const submitHandler=async (data:any)=>{
if(!data.origin.lat){
    setError("origin",{message:t("errors.originReq")})
    return
}if(!data.destination.lat){
    setError("destination",{message:t("errors.dstReq")})
    return
}if(!data.airline.iata){
    setError("airline",{message:t("errors.airlineReq")})
}
   if(!data.start){
                setError("start",{message:t("errors.startTimeReq")})
                return
                    }  if(!data.end){
                        setError('end',{message:t("errors.endTimeReq")})
                        return
                            }if(!data.position){
                                                setError('position',{message:t("errors.typeReq")})
                                                return
                                                    }
                                                    if(props.plan){
                                                        mutate({flight:data,planId:props.plan._id}) 
                                                    }else{
                                                        setFlightData(data);
                                                        setOpen(true);
                                                    }                               
}


  return (
    <>
    <Card>
        <CardHeader sx={{textAlign:'center'}} title={t("header")}></CardHeader>
        <CardContent sx={{display:'flex',justifyContent:'center'}} >
            
<form style={{display:'flex',flexDirection:'column',gap:'30px',maxWidth:"500px"}} onSubmit={handleSubmit((data)=>{submitHandler(data)})}>
    <Box justifyContent={"center"} gap={3} display="flex"  >

<FormControl fullWidth >
    <ToolTip title={t("departionTooltip")} right='-5%' top='-20%'>
     <Autocomplete isOptionEqualToValue={(option,value)=>option.iata===value.iata} onChange={(e,value)=>{changeHandler('origin',value)}}   options={airportsData} getOptionLabel={(option)=>option.name} renderOption={(props, option) => 
        {
        return(
        <Box component="li"  {...props}>
          <option value={option.iata}>
          {option.name}
          </option>
          
        </Box>
      )}
    }  renderInput={(params)=><TextField   onChange={autoCompleteHandler}   label={t("origin")} {...params}  />} /> 
   </ToolTip>
   {formState.errors.origin&& <FormHelperText sx={{color:'red'}}>{formState.errors.origin.message}</FormHelperText>}
</FormControl>
<FormControl fullWidth>
<ToolTip title={t("arrivalTooltip")} right='-5%' top='-20%'>
 <Autocomplete isOptionEqualToValue={(option,value)=>option.iata===value.iata} onChange={(e,value)=>{changeHandler('destination',value)}}   options={airportsData} getOptionLabel={(option)=>option.name} renderOption={(props, option) => 
        {
        return(
        <Box component="li"  {...props}>
          <option value={option.iata}>
          {option.name}
          </option>
          
        </Box>
      )}
    }  renderInput={(params)=><TextField  onChange={autoCompleteHandler}   label={t("destination")} {...params}  />} /> 
</ToolTip>
{formState.errors.destination&& <FormHelperText sx={{color:'red'}}>{formState.errors.destination.message}</FormHelperText>}
</FormControl>

</Box>
 <Box justifyContent={"center"} gap={3} display="flex"  >
<FormControl fullWidth>
    <DateTimeInput name='start' value={new Date()}  control={control} label={t("departure")} />
</FormControl>
<FormControl fullWidth>
<DateTimeInput name='end' value={new Date()}   control={control} label={t("arrival")} />
</FormControl>
</Box> 
<FormControl fullWidth>
<Autocomplete onChange={(e,value)=>{changeHandler('airline',value)}} isOptionEqualToValue={(option,value)=>option.iata===value.iata}  getOptionLabel={(option:{name:string,iata:string,country:string})=> option.name+" "+ option.iata} options={allAirlines} renderInput={(params)=><TextField   label={t("airline")} {...params}  />} renderOption={(props, option) => 
        {
        return(
        <Box key={option.name}    component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}  {...props}>
           <Image
        loading="lazy"
        width="60"
        height={'30'}
       src={`https://daisycon.io/images/airline/?width=60&height=30&color=ffffff&iata=${option.iata}`}
        
        alt=""
      /> 
          <option  value={option.iata}>
          
          {option.name}
          </option>
          
        </Box>
      )}} />
      {formState.errors.airline&& <FormHelperText sx={{color:'red'}}>{formState.errors.airline.message}</FormHelperText>}
</FormControl>
<Box justifyContent={"center"} gap={3} display="flex"   >

<FormControl fullWidth>
<TextField label={t("flightNum")} {...register('flightNumber',{required:t("errors.flightNumReq")})} />
</FormControl>
<FormControl fullWidth>
<TextField label={t("price")} type={'number'} {...register('price',{valueAsNumber:true})} />
</FormControl>

</Box>
<FormControl fullWidth    >
<FormLabel  id="demo-radio-buttons-group-label">{t("type")}</FormLabel>
<ToolTip title={t("positionTooltip")}>
<RadioGroup  name="radio-buttons-group"   defaultValue={'start'} sx={{justifyContent:'center'}}   row >
    <FormControlLabel {...register('position')}  defaultChecked value="start" control={<Radio />} label={t("start")} />
    <FormControlLabel {...register('position')} value="end"  control={<Radio />} label={t("end")}/>
    <FormControlLabel {...register('position')} value="other"  control={<Radio />} label={t("other")} />
</RadioGroup>
</ToolTip>
{formState.errors.position&& <FormHelperText sx={{color:'red'}}>{formState.errors.position.message}</FormHelperText>}
</FormControl>


{isLoading?<CircularProgress size={'2rem'}/>:<UiButton submit size='small' clickFn={()=>{}} >{t("addBtn")}</UiButton>}

</form>
        </CardContent>
        
    </Card>
   {props.plans&&<AddFlightModal setSnackBar={setSnackBar} plans={props.plans} open={open} onClose={onClose} flight={flightData} />}
   <SnackBar {...snackBarProps}/>
    </>
  )
}

export default FlightAdd