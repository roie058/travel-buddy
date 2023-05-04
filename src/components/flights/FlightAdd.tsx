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

type Props = {plan?:Plan,plans?:Plan[]}

const allAirlines=airLines.reduce((prev:any,cur)=>{
if(cur.active==="Y"&&cur.iata.length>1){
    return  [...prev,{name:cur.name,iata:cur.iata,country:cur.country}]
}else return prev
},[])

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

const [open, setOpen] = useState(false)
const [isLoading, setIsLoading] = useState(false)
const [flightData, setFlightData] = useState<Flight>()

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

    
    
    if(!data.origin?.lat){
setError('origin',{message:'Origin Is Required'})
    }
    if(!data.destination?.name){
        setError("destination",{message:'Destination Is Required'})
        return
            }  if(!data.start){

                setError("start",{message:'Departure Time Is Required'})
                return
                    }  if(!data.end){
                        setError('end',{message:'Arrival Time Is Required'})
                        return
                            }if(!data.airline){
                                setError('airline',{message:'Airline Is Required'})
                                return
                                    }if(!data.flightNumber){
                                        setError('flightNumber',{message:'Flight Number Is Required'})
                                        return
                                            }if(!data.position){
                                                setError('position',{message:'Type Is Required'})
                                                return
                                                    }
                                                    if(props.plan){
                                                        try {
                                                            setIsLoading(true)
                                                            const {data:res} = await axios.patch('/api/flight/newFlight',{flight:data,planId:props.plan._id})
                                                            setIsLoading(false) 
                                                            if(res.success){
      
                                                             props.plan.flights.push(res.flight) 
                                                            
                                                            }else{
                                                              console.log(data.error);  
                                                            }
                                                            
                                                          } catch (error) {
                                                            console.log(error);
                                                          }
                                                      
                                                        setIsLoading(false)   
                                                    }else{
                                                        setFlightData(data);
                                                        setOpen(true);
                                                    }
                                                    
}


  return (
    <>
    <Card>
        <CardHeader sx={{textAlign:'center'}} title="Add Flights Manualy"></CardHeader>
        <CardContent sx={{display:'flex',justifyContent:'center'}} >
            
<form style={{display:'flex',flexDirection:'column',gap:'30px',maxWidth:"500px"}} onSubmit={handleSubmit((data)=>{submitHandler(data)})}>
    <Box justifyContent={"center"} gap={3} display="flex"  >

<FormControl fullWidth >
     <Autocomplete isOptionEqualToValue={(option,value)=>option.iata===value.iata} onChange={(e,value)=>{changeHandler('origin',value)}}   options={airportsData} getOptionLabel={(option)=>option.name} renderOption={(props, option) => 
        {
        return(
        <Box component="li"  {...props}>
          <option value={option.iata}>
          {option.name}
          </option>
          
        </Box>
      )}
    }  renderInput={(params)=><TextField   onChange={autoCompleteHandler}   label="Origin" {...params}  />} /> 
   
</FormControl>
<FormControl fullWidth>
 <Autocomplete isOptionEqualToValue={(option,value)=>option.iata===value.iata} onChange={(e,value)=>{changeHandler('destination',value)}}   options={airportsData} getOptionLabel={(option)=>option.name} renderOption={(props, option) => 
        {
        return(
        <Box component="li"  {...props}>
          <option value={option.iata}>
          {option.name}
          </option>
          
        </Box>
      )}
    }  renderInput={(params)=><TextField   onChange={autoCompleteHandler}   label="Destination" {...params}  />} /> 
</FormControl>
</Box>
 <Box justifyContent={"center"} gap={3} display="flex"  >
<FormControl fullWidth>
    <DateTimeInput name='start' value={new Date()}  control={control} label="Departure Time" />
</FormControl>
<FormControl fullWidth>
<DateTimeInput name='end' value={new Date()}   control={control} label="Arival Time" />
</FormControl>
</Box> 
<FormControl fullWidth>
<Autocomplete onChange={(e,value)=>{changeHandler('airline',value)}} isOptionEqualToValue={(option,value)=>option.iata===value.iata}  getOptionLabel={(option:{name:string,iata:string,country:string})=> option.name+" "+ option.iata} options={allAirlines} renderInput={(params)=><TextField    label="Airline" {...params}  />} renderOption={(props, option) => 
        {
        return(
        <Box key={option.name}    component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}  {...props}>
           <Image
        loading="lazy"
        width="30"
        height={'30'}
       src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${option.iata}`}
        
        alt=""
      /> 
          <option  value={option.iata}>
          
          {option.name}
          </option>
          
        </Box>
      )}} />
</FormControl>
<Box justifyContent={"center"} gap={3} display="flex"   >

<FormControl fullWidth>
<TextField label="Flight Number" {...register('flightNumber',{required:'Flight Number Is Required'})} />
</FormControl>
<FormControl fullWidth>
<TextField label="Flight Price" type={'number'} {...register('price',{valueAsNumber:true})} />
</FormControl>

</Box>
<FormControl fullWidth    >
<FormLabel  id="demo-radio-buttons-group-label">Type</FormLabel>
<RadioGroup  name="radio-buttons-group"   defaultValue={'start'} sx={{justifyContent:'center'}}   row >
    <FormControlLabel {...register('position')}  defaultChecked value="start" control={<Radio />} label="Start" />
    <FormControlLabel {...register('position')} value="end"  control={<Radio />} label="End" />
    <FormControlLabel {...register('position')} value="other"  control={<Radio />} label="Other" />
</RadioGroup>
</FormControl>
{formState.errors.origin?.message&&<FormHelperText  sx={{textAlign:"center",color:'red'}} >{formState.errors.origin?.message}</FormHelperText>}
{formState.errors.destination?.message&&<FormHelperText  sx={{textAlign:"center",color:'red'}} >{formState.errors.destination?.message}</FormHelperText>}
{formState.errors.start?.message&&<FormHelperText  sx={{textAlign:"center",color:'red'}} >{formState.errors.start?.message}</FormHelperText>}
{formState.errors.end?.message&&<FormHelperText  sx={{textAlign:"center",color:'red'}} >{formState.errors.end?.message}</FormHelperText>}
{formState.errors.airline?.message&&<FormHelperText  sx={{textAlign:"center",color:'red'}} >{formState.errors.airline?.message}</FormHelperText>}
{formState.errors.flightNumber?.message&&<FormHelperText  sx={{textAlign:"center",color:'red'}} >{formState.errors.flightNumber?.message}</FormHelperText>}
{formState.errors.price?.message&&<FormHelperText  sx={{textAlign:"center",color:'red'}} >{formState.errors.price?.message}</FormHelperText>}


{isLoading?<CircularProgress size={'2rem'}/>:<UiButton submit size='small' clickFn={()=>{}} >Add</UiButton>}

</form>
        </CardContent>
        
    </Card>
   {props.plans&&<AddFlightModal plans={props.plans} open={open} onClose={onClose} flight={flightData} />}
    </>
  )
}

export default FlightAdd