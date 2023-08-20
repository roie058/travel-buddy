import { AlertColor, Box, Button, ButtonGroup, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, Modal, Radio, RadioGroup, Switch, TextField, Typography } from '@mui/material'
import React, { MouseEventHandler } from 'react'
import UiButton from '../ui/buttons/UiButton'
import { useTranslation } from 'react-i18next'
import { useFieldArray, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Flight } from './AddFlightModal'
import { Plan } from '../pageCompnents/Schedule'
import { queryClient } from '@/pages/_app'
import { editFlight } from '@/util/fetchers'
import {useRouter} from 'next/router'
import ToolTip from '../ui/ToolTip'

import SingleFlightEditForm from './SingleFlightEditForm'
import { RouteObj } from './ResultCard'
import axios from 'axios'


type Props = {onClose:() => void,flight:Flight,plan:Plan,setSnackBar:(text:string,alart:AlertColor)=>void}

const EditFlight = ({onClose,flight,plan,setSnackBar}: Props) => {
    const {register,handleSubmit,control,getValues,setValue,formState,setError}=useForm({defaultValues:{...flight,departure:new Date(flight.departure),arrival:new Date(flight.arrival)}})
   const {t}=useTranslation("flights")
const {locale}=useRouter()
   const { update,remove } = useFieldArray({name:"flightDetails",control:control});

    const {mutate,isLoading}=useMutation({mutationFn: editFlight,
onSuccess:()=>{
  setSnackBar(t("snack.editFlight"),'success')
  onClose()
  queryClient.invalidateQueries(["plan",plan._id])
  queryClient.invalidateQueries(["plans"])
},
onError:()=>{
  setSnackBar(t("snack.serverError"),"error")
}

    })

    const onSubmit=async(data:Flight)=>{

const formattedData:Flight={
...data,
arrival:data.flightDetails[data.flightDetails.length-1].local_arrival,
departure:data.flightDetails[0].local_departure,
flightDetails:data.flightDetails.map((detail:RouteObj)=>({...detail,utc_arrival:detail.local_arrival,utc_departure:detail.local_departure}))
}

if(data.flightDetails.some((detail)=>detail.flyFrom==""||!detail?.flyFrom)){
  const index=data.flightDetails.findIndex((detail)=>detail.flyFrom===""||!detail?.flyFrom)
  if(index!==-1){
    setError(`flightDetails.${index}.flyFrom`,{message:t("errors.originReq")})
    return
  }
 }if(data.flightDetails.some((detail)=>detail.flyTo===""||!detail?.flyTo)){
  const index=data.flightDetails.findIndex((detail)=>detail.flyTo===""||!detail?.flyTo)
  if(index!==-1){
    setError(`flightDetails.${index}.flyTo`,{message:t("errors.dstReq")})
    return
  } 
 }if( data.flightDetails.some((detail)=>detail.airline===""||!detail?.airline) ){
   const index=data.flightDetails.findIndex((detail)=>detail.airline===""||!detail?.airline)
   if(index!==-1){
   setError(`flightDetails.${index}.airline`,{message:t("errors.airlineReq")})
     return
   }
 }
    if(!data.flightDetails.some((detail)=>!detail.local_departure)){
      const index=data.flightDetails.findIndex((detail)=>!detail.local_departure)
      if(index!==-1){
        setError(`flightDetails.${index}.local_departure`,{message:t("errors.startTimeReq")})
        return
      }
                 
                     }  if(!data.flightDetails.some((detail)=>!detail.local_arrival)){
                      const index=data.flightDetails.findIndex((detail)=>!detail.local_arrival)
                      if(index!==-1){
                        setError(`flightDetails.${index}.local_arrival`,{message:t("errors.endTimeReq")})
                        return
                      }
                             }if(!data.position){
                                                 setError('position',{message:t("errors.typeReq")})
                                                 return
                                                     }

    mutate({flight:formattedData,planId:plan._id,flightId:flight._id})   
        }

        const addStop:MouseEventHandler=(e)=>{
          e.preventDefault()
          const array= getValues("flightDetails")
          update(array.length,{airline:"",cityFrom:"",cityTo:"",flyFrom:"",flyTo:"",local_arrival:new Date(),local_departure:new Date(),utc_arrival:new Date(),utc_departure:new Date(),return:0
          })
        
        }
        const removeStop:MouseEventHandler= async(e)=>{
          e.preventDefault()
          const array= getValues("flightDetails")
          
          remove(array.length-1)
          setValue("arrival",array[array.length-2].local_arrival)
          const {data} =await axios.get(`https://api.tequila.kiwi.com/locations/query`,{headers:{apikey:process?.env?.KIWI_KEY},params:{term:array[array.length-2].cityTo,location_types:"airport",locale:locale==="he"?"iw-IL":"en-US"}})
          const destination=data.locations[0]
          getValues("airline").pop()
          getValues("flightNumber").pop()
          setValue("destination",{iata:array[array.length-2].flyTo,name:destination.name,lat:destination.lat,lng:destination.lon})
        }



  return (

        <Box sx={ {
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,}}>
      <Button onClick={onClose} sx={{textTransform:"capitalize"}} >{t("back")}</Button>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {t("editHeader")} <span style={{color:"turquoise",fontWeight:'bold',textDecoration:'underline'}}>{flight.destination.name}</span>
      </Typography>
      <form style={{display:'flex',flexDirection:'column',gap:'30px'}} onSubmit={handleSubmit((data)=>{onSubmit(data)})}>

      {getValues("flightDetails").map((flight,index)=>
<SingleFlightEditForm getValues={getValues} key={index} index={index} setValue={setValue} control={control} register={register} formState={formState}  />
)}
<ButtonGroup fullWidth>
<Button disabled={getValues("flightDetails").length<=1} onClick={removeStop}  sx={{textTransform:"capitalize"}}>{t("removeStop")} -</Button>
<Button onClick={addStop}  sx={{textTransform:"capitalize"}}>{t("addStop")} +</Button>

</ButtonGroup>

<FormControl fullWidth>
<TextField label={t("price")} type={'number'} {...register('price',{valueAsNumber:true,required:t("priceReq"),min:{value:0,message:t("priceReq")}})} />
{formState.errors.price&& <FormHelperText sx={{color:"red"}}>{formState.errors.price.message}</FormHelperText>}
</FormControl>
<FormControl fullWidth>
<FormLabel  id="demo-radio-buttons-group-label">{t("type")}</FormLabel>
<ToolTip title={t("positionTooltip")}>
<RadioGroup  name="radio-buttons-group"   defaultValue={flight.position} sx={{justifyContent:'center'}}   row >
    <FormControlLabel {...register('position')}   value="start" control={<Radio />} label={t("start")} />
    <FormControlLabel {...register('position')} value="end"  control={<Radio />} label={t("end")}/>
    <FormControlLabel {...register('position')} value="other"  control={<Radio />} label={t("other")} />
</RadioGroup>
</ToolTip>
{formState.errors.position&& <FormHelperText sx={{color:'red'}}>{formState.errors.position.message}</FormHelperText>}
</FormControl>
<FormControl>
<FormControlLabel control={<Switch defaultChecked={formState.defaultValues.booked} {...register("booked")} />} label={t("booked")} />
</FormControl>

{isLoading?<CircularProgress size={'2rem'}/>:<UiButton submit size='small' clickFn={()=>{}} >{t("editBtn")}</UiButton>}

</form>
    </Box>
  )
}

export default EditFlight