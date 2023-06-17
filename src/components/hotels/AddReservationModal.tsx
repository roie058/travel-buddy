
import { IPlace } from '@/dummyData';
import { AlertColor, Box, CircularProgress,  FormControl,  FormHelperText, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import UiButton from '../ui/buttons/UiButton';
import DateInput from '../ui/inputs/DateInput';
import styles from '../form/EditPlan.module.css'
import { Plan } from '../pageCompnents/Schedule';
import { useTranslation } from 'next-i18next';
import { useMutation } from '@tanstack/react-query';
import { addReservation } from '@/util/fetchers';
import { queryClient } from '@/pages/_app';

type Props = {onClose:()=>void,open:boolean,hotel:IPlace,plan:Plan,setSnackBar: (message: string, severity: AlertColor) => void}

const AddReservationModal = (props: Props) => {

    const {register,formState,getValues,handleSubmit,control}=useForm({defaultValues:{start:new Date(props.plan.start)?? new Date(),end:new Date(props.plan.start)?? new Date(),nightPrice:0,place:props.hotel}})
    const [submitError, setSubmitError] = useState<undefined|string|unknown>()
   const {t}=useTranslation("hotels")

    const [startDate,setStartDate]=useState<null|Date>(props.plan.start?? new Date())
    const {mutate,isLoading}=useMutation({mutationFn: addReservation,
onSuccess:()=>{
  props.setSnackBar(t("snack.addReservation"),'success')
  props.onClose()
  queryClient.invalidateQueries(["plan",props.plan._id])
},
onError:()=>{
  setSubmitError(t("snack.serverError"))
}

    })
    const onStartDateChange=(e:any)=>{
        setStartDate(e.$d)
      
       }

    const onSubmit=async(data:FieldValues)=>{
    mutate({data,planId:props.plan._id})   
        }



  return (
    <Modal  open={props.open} sx={{zIndex:'10'}} onClose={props.onClose}><Box sx={ {position: 'absolute' as 'absolute',
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
        {t("form.header")} <span style={{color:"turquoise",fontWeight:'bold',textDecoration:'underline'}}>{props.hotel.name}</span>
      </Typography>
      <form  className={styles.form}  onSubmit={handleSubmit((data)=>{onSubmit(data);
      })}>
{startDate &&<Box width={'100%'} gap="10px" display={'flex'}  >
  <FormControl fullWidth>
<DateInput hotel control={control} start={props.plan.start} end={props.plan.end}   onChange={onStartDateChange}  name='start' label={t("form.startDate")} />
</FormControl>
 <FormControl fullWidth>
<DateInput hotel control={control}    start={startDate} end={props.plan.end} name='end' label={t("form.endDate")} />
</FormControl>


</Box>}

      <FormControl fullWidth>
<TextField   label={`${t("form.ppn")} ${props.plan.budget.currency??'$'}`}  error={typeof formState.errors.nightPrice?.message  === 'string'||Number(getValues('nightPrice'))<=0} type={'number'} {...register('nightPrice',{valueAsNumber:true,min:{value:1,message:t("form.priceMin")}})} />
    <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.nightPrice?.message}</FormHelperText>
</FormControl>

{isLoading?<CircularProgress size={'5rem'}/>:<UiButton disabled={!formState.isValid} clickFn={()=>{}}  submit size='small'>{t("form.button")}</UiButton>}
<FormHelperText sx={{color:'#d32f2f'}}>{typeof submitError === 'string'? submitError:''}</FormHelperText>
    </form>
    </Box></Modal>
  )
}

export default AddReservationModal