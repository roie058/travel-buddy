import { AlertColor, Box, CircularProgress, FormControl, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import UiButton from '../ui/buttons/UiButton'
import { useTranslation } from 'react-i18next'
import { FieldValues, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Flight } from './AddFlightModal'
import { Plan } from '../pageCompnents/Schedule'
import { queryClient } from '@/pages/_app'
import { editFlight } from '@/util/fetchers'
import DateTimeInput from '../ui/inputs/DateTimeInput'

type Props = {open:boolean,onClose:() => void,flight:Flight,plan:Plan,setSnackBar:(text:string,alart:AlertColor)=>void}

const EditFlight = ({open,onClose,flight,plan,setSnackBar}: Props) => {
    const {register,handleSubmit,control}=useForm({defaultValues:{flightNumber:flight.flightNumber,start:new Date(flight.start)?? new Date(),end:new Date(flight.end)?? new Date(),price:flight.price,place:flight}})
    const [submitError, setSubmitError] = useState<undefined|string|unknown>()
   const {t}=useTranslation("flights")

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

    const onSubmit=async(data:FieldValues)=>{
    mutate({flight:data,planId:plan._id,flightId:flight._id})   
        }




  return (
    <Modal  open={open} sx={{zIndex:'10'}} onClose={onClose}>
        <Box sx={ {position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxWidth:'600px',
    bgcolor: 'white',
   borderRadius:'30px',
    boxShadow: 24,
    p: 4,}}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {t("editHeader")} <span style={{color:"turquoise",fontWeight:'bold',textDecoration:'underline'}}>{flight.destination.name}</span>
      </Typography>
      <form style={{display:'flex',flexDirection:'column',gap:'30px'}} onSubmit={handleSubmit((data)=>{onSubmit(data)})}>

 <Box justifyContent={"center"} gap={3} display="flex"  >
<FormControl fullWidth>
    <DateTimeInput name='start' value={flight.start}  control={control} label={t("departure")} />
</FormControl>
<FormControl fullWidth>
<DateTimeInput name='end' value={flight.end}  control={control} label={t("arrival")} />
</FormControl>
</Box> 

<Box justifyContent={"center"} gap={3} display="flex"   >

<FormControl fullWidth>
<TextField label={t("flightNum")} {...register('flightNumber',{required:t("errors.flightNumReq")})} />
</FormControl>
<FormControl fullWidth>
<TextField label={t("price")} type={'number'} {...register('price',{valueAsNumber:true})} />
</FormControl>

</Box>


{isLoading?<CircularProgress size={'2rem'}/>:<UiButton submit size='small' clickFn={()=>{}} >{t("editBtn")}</UiButton>}

</form>
    </Box></Modal>
  )
}

export default EditFlight