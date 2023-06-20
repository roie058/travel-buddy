import { queryClient } from '@/pages/_app'
import { AlertColor, Box, CircularProgress, FormControl, FormHelperText, Modal, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import UiButton from '../ui/buttons/UiButton'
import { Hotel, Plan } from '../pageCompnents/Schedule'
import { editReservation } from '@/util/fetchers'
import DateInput from '../ui/inputs/DateInput'

type Props = {open:boolean,onClose:() => void,reservation:Hotel,plan:Plan,setSnackBar:(text:string,alart:AlertColor)=>void}

const EditReservation = ({open,onClose,reservation,plan,setSnackBar}: Props) => {
    const [startDate,setStartDate]=useState<null|Date>(plan?.start?? new Date())
    const {register,handleSubmit,control,formState,getValues}=useForm({defaultValues:{start:new Date(reservation?.start)?? new Date(),end:new Date(reservation?.end)?? new Date(),nightPrice:reservation?.nightPrice,place:reservation}})
   const {t}=useTranslation("hotels")

    const {mutate,isLoading}=useMutation({mutationFn: editReservation,
onSuccess:()=>{
  setSnackBar(t("snack.editHotel"),'success')
  onClose()
  queryClient.invalidateQueries(["plan",plan._id])
},
onError:()=>{
  setSnackBar(t("snack.serverError"),"error")
}

    })

    const onSubmit=async(data:FieldValues)=>{
    mutate({data,planId:plan._id,hotelId:reservation._id})   
        }

        const onStartDateChange=(e:any)=>{
            setStartDate(e.$d)
          
           }


  return (
    <Modal  open={open} sx={{zIndex:'10'}} onClose={onClose}><Box sx={ {position: 'absolute' as 'absolute',
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
        {t("form.edit")} <span style={{color:"turquoise",fontWeight:'bold',textDecoration:'underline'}}>{reservation?.place.name}</span>
      </Typography>
      <form  style={{display:'flex',flexDirection:'column',gap:'30px'}}  onSubmit={handleSubmit((data)=>{onSubmit(data);
      })}>
{startDate &&<Box width={'100%'} gap="10px" display={'flex'}  >
  <FormControl fullWidth>
<DateInput hotel control={control} start={plan?.start} end={plan?.end}   onChange={onStartDateChange}  name='start' label={t("form.startDate")} />
</FormControl>
 <FormControl fullWidth>
<DateInput hotel control={control}    start={startDate} end={plan?.end} name='end' label={t("form.endDate")} />
</FormControl>


</Box>}

      <FormControl fullWidth>
<TextField   label={`${t("form.ppn")} ${plan?.budget?.currency??'$'}`}  error={typeof formState.errors.nightPrice?.message  === 'string'||Number(getValues('nightPrice'))<=0} type={'number'} {...register('nightPrice',{valueAsNumber:true,min:{value:1,message:t("form.priceMin")}})} />
    <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.nightPrice?.message}</FormHelperText>
</FormControl>

{isLoading?<CircularProgress size={'5rem'}/>:<UiButton disabled={!formState.isValid} clickFn={()=>{}}  submit size='small'>{t("form.editBtn")}</UiButton>}
    </form>
    </Box></Modal>
  )
}

export default EditReservation