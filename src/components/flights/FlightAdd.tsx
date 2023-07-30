import dynamic from 'next/dynamic'
const  AddFlightModal= dynamic(()=>import('./AddFlightModal'), {
    loading: () => <p>Loading...</p>,
  }) 
  const  SnackBar= dynamic(()=>import('../ui/SnackBar'), {
    loading: () => <p>Loading...</p>,
  })

import { Button, ButtonGroup, Card, CardContent, CardHeader, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'

import React, { MouseEventHandler, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import UiButton from '../ui/buttons/UiButton'

import  { Flight } from './AddFlightModal'

import { Plan } from '../pageCompnents/Schedule'
import useSnackBar from '@/hooks/useSnackBar'

import ToolTip from '../ui/ToolTip'
import { useTranslation } from 'next-i18next'
import { useMutation } from '@tanstack/react-query'
import { addNewFlight } from '@/util/fetchers'
import { queryClient } from '@/pages/_app'
import SingleFlightForm from './SingleFlightForm'

type Props = {plan?:Plan,plans?:Plan[]}

type FieldValues= {
  flightDetails: {
      departure: Date;
      arrival: Date;
      airline: {iata:string};
      destination: {name:string,iata:string,lat:number,lng:number};
      origin: {name:string,iata:string,lat:number,lng:number};
      flightNumber: string;
  }[];
  position: string;
  price: number;
}


const FlightAdd = (props: Props) => {
    const {register,control,setError,handleSubmit,setValue,formState,getValues,clearErrors}=useForm({defaultValues:{flightDetails:[{departure:new Date(),arrival:new Date(),airline:'',destination:"",origin:'',flightNumber:""}],position:'',price:0}})

const {setSnackBar,snackBarProps}=useSnackBar()
const [open, setOpen] = useState(false)
const [flightData, setFlightData] = useState<Flight>()
const{t}=useTranslation("flights")
const { update,remove } = useFieldArray({name:"flightDetails",control:control});
const {mutate,isLoading}=useMutation(addNewFlight,{onSuccess:(data,{planId})=>{
    setSnackBar(t("snack.added"),'success')
queryClient.invalidateQueries(["plan",planId])

}})


const addStop:MouseEventHandler=(e)=>{
  e.preventDefault()
 
  const array= getValues("flightDetails")
  update(array.length,{departure:new Date(),arrival:new Date(),airline:'',destination:"",origin:"",flightNumber:""})

}
const removeStop:MouseEventHandler=(e)=>{
  e.preventDefault()
  const array= getValues("flightDetails")
  remove(array.length-1)

}

console.log(formState.errors);


const onClose=()=>{
    setOpen(false)
}

const submitHandler=async (data:any)=>{
  const flightDetails:FieldValues["flightDetails"]=data.flightDetails
const formattedData:Flight={
  ...data,
  booked:true,
  departure:flightDetails[0].departure,
  arrival:flightDetails[flightDetails.length-1].arrival,
  stops:flightDetails.length-1,
  origin:flightDetails[0].origin,
  destination:flightDetails[flightDetails.length-1].destination,
  airline:flightDetails.map((detail)=>(detail.airline.iata)),
  flightNumber:flightDetails.map((detail)=>(detail.flightNumber)),
  flightDetails:flightDetails.map((details)=>({
airline:details.airline.iata,
cityFrom:details.origin.name,
cityTo:details.destination.name,
flyFrom:details.origin.iata,
flyTo:details.destination.iata,
local_arrival:details.arrival,
local_departure:details.departure,
utc_arrival:details.arrival,
utc_departure:details.departure,
return:0
}))


}
 if(data.flightDetails.some((detail)=>detail.origin.name===""||!detail?.origin?.name)){
  const index=data.flightDetails.findIndex((detail)=>detail.origin.name===""||!detail?.origin?.name)
  if(index!==-1){
    setError(`flightDetails.${index}.origin`,{message:t("errors.originReq")})
    return
  }
 }if(data.flightDetails.some((detail)=>detail.destination.name===""||!detail?.destination?.name)){
  const index=data.flightDetails.findIndex((detail)=>detail.destination.name===""||!detail?.destination?.name)
  if(index!==-1){
    setError(`flightDetails.${index}.destination`,{message:t("errors.dstReq")})
    return
  } 
 }if( data.flightDetails.some((detail)=>detail.airline.iata===""||!detail?.airline?.iata) ){
   const index=data.flightDetails.findIndex((detail)=>detail.airline.iata===""||!detail?.airline?.iata)
   if(index!==-1){
   setError(`flightDetails.${index}.airline`,{message:t("errors.airlineReq")})
     return
   }
 }
    if(!data.flightDetails.some((detail)=>!detail.departure)){
      const index=data.flightDetails.findIndex((detail)=>!detail.departure)
      if(index!==-1){
        setError(`flightDetails.${index}.departure`,{message:t("errors.startTimeReq")})
        return
      }
                 
                     }  if(!data.flightDetails.some((detail)=>!detail.arrival)){
                      const index=data.flightDetails.findIndex((detail)=>!detail.arrival)
                      if(index!==-1){
                        setError(`flightDetails.${index}.arrival`,{message:t("errors.endTimeReq")})
                        return
                      }
                             }if(!data.position){
                                                 setError('position',{message:t("errors.typeReq")})
                                                 return
                                                     }
                                                     
                                                     
                                                     if(props.plan){
                                                         mutate({flight:formattedData,planId:props.plan._id}) 
                                                     }else{
                                                         setFlightData(formattedData);
                                                         setOpen(true);
                                                     }                               
}

  return (
    <>
    <Card sx={{overflowY:"scroll"}}>
        <CardHeader sx={{textAlign:'center'}} title={t("header")}></CardHeader>
        <CardContent sx={{display:'flex',justifyContent:'center'}} >
            
<form style={{display:'flex',flexDirection:'column',gap:'30px',maxWidth:"500px"}} onSubmit={handleSubmit((data)=>{submitHandler(data)})}>

{getValues("flightDetails").map((flight,index)=>
<SingleFlightForm clearErrors={clearErrors} key={index} index={index} setValue={setValue} control={control} register={register} formState={formState}  />
)}
<ButtonGroup fullWidth>
<Button disabled={getValues("flightDetails").length<=1} onClick={removeStop}  sx={{textTransform:"capitalize"}}>{t("removeStop")} -</Button>
<Button onClick={addStop}  sx={{textTransform:"capitalize"}}>{t("addStop")} +</Button>

</ButtonGroup>

<FormControl fullWidth>
<TextField label={t("price")} type={'number'} {...register('price',{valueAsNumber:true,min:{value:0,message:t("priceReq")}})} />
</FormControl>
<FormControl fullWidth>
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