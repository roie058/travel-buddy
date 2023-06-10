

import { AlertColor, CircularProgress, FormControl, FormHelperText, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { Autocomplete } from '@react-google-maps/api'


import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import UiButton from '../ui/buttons/UiButton'
import DateInput from '../ui/inputs/DateInput'
import ImageInput from '../ui/inputs/ImageInput'
import styles from './EditPlan.module.css'
import { Plan } from '../pageCompnents/Schedule'

import { useTranslation } from 'next-i18next'
import {useMutation} from '@tanstack/react-query'
import { editPlan } from '@/util/fetchers'
import { useRouter } from 'next/router'
import moment from 'moment'
import { queryClient } from '@/pages/_app'


type Props = {plan:Plan,setOpen:React.Dispatch<React.SetStateAction<boolean>>,openSnackBar:(message: string, severity: AlertColor) => void}

const compereFormData:(data1:FieldValues,data2:Plan)=>boolean=(data1,data2)=>{
if (data1.header !== data2.header)return false
if (data1.image !== data2.image)return false
if (data1.country !== data2.country)return false
if (data1.currency !== data2.budget.currency)return false
if (data1.start.getTime() !== data2.start.getTime())return false
if (data1.end.getTime() !== data2.end.getTime())return false
if (data1.budget !== data2.budget.budget)return false
return true
}


const EditPlan = (props: Props) => {
  const [submitError, setSubmitError] = useState<undefined|string>()
const {register,control,setValue,formState,getValues,handleSubmit}=useForm({defaultValues:{ ...props.plan,currency:props.plan.budget.currency,start:new Date(props.plan.start),end:new Date(props.plan.end),budget:props.plan.budget.budget}})
const{t}=useTranslation("form")
const {query}=useRouter()

const {mutate,isLoading}=useMutation({mutationFn:editPlan,onSuccess:()=>{
  props.openSnackBar(t("snack.edit"),"success")
  props.setOpen(false)
queryClient.invalidateQueries(["plan",query.planId])
},onError:(error)=>{setSubmitError(String(error))}})


const onStartDateChange=(e:any)=>{
  setValue('start',e._d)
 }


 const submitEditing=async (data:any)=>{
 if(compereFormData(data,{ ...props.plan,start:new Date(props.plan.start),end:new Date(props.plan.end)})){
 setSubmitError(t("errors.sameData"))
 }else{
 const isDateChange=moment(data.start).format('YYYY-MM-DD') !== moment(formState.defaultValues?.start).format('YYYY-MM-DD')||moment(data.end).format('YYYY-MM-DD') !== moment(formState.defaultValues?.end).format('YYYY-MM-DD')
mutate({isDateChange,data})
 }
}

  return (
    <form  className={styles.form} onSubmit={handleSubmit(submitEditing)}>
      <FormControl fullWidth>
  <TextField fullWidth error={ typeof formState.errors.header?.message  === 'string'} {...register('header',{required:t("errors.nameReq"),maxLength:{value:25,message:t("errors.nameMax")}})}  defaultValue={getValues('header')} label={t("editName")} />
  <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.header?.message}</FormHelperText>
</FormControl>
<FormControl fullWidth>
  <Autocomplete className={styles.googleAuto}>
  <TextField fullWidth error={typeof formState.errors.country?.message  === 'string'}  {...register('country',{required:t("errors.destinationReq")})} defaultValue={getValues('country')} label={t("editDestination")} />
  </Autocomplete>
  <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.country?.message}</FormHelperText>
</FormControl>
<Box display={"flex"} width={"100%"}>
<FormControl fullWidth sx={{flexBasis:'80%'}}>
    <TextField   label={t("budget")}  error={typeof formState.errors.budget?.message  === 'string'||Number(getValues('budget'))<=0} type={'number'} {...register('budget',{valueAsNumber:true,min:{value:1,message:t("errors.budgetReq")}})} />
    <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.budget?.message}</FormHelperText>
</FormControl>
<FormControl sx={{flexBasis:'20%'}} >
    <Select {...register('currency',{required:true})} renderValue={(value)=>value} defaultValue={props.plan.budget.currency}>
      <MenuItem value="$">$ USD</MenuItem>
      <MenuItem value="£">£ GBP</MenuItem>
      <MenuItem value="€">€ EUR</MenuItem>
      <MenuItem value="₪">₪ ILS</MenuItem>
      <MenuItem value="¥">¥ JPY</MenuItem>
      <MenuItem value="₹">₹ INR</MenuItem>
      <MenuItem value="₽">₽ RUB</MenuItem>
      <MenuItem value="₩">₩ KRW</MenuItem>
     
    </Select>
</FormControl>
</Box>
<Box width={'100%'} gap="10px" display={'flex'}  >
  <FormControl fullWidth>
<DateInput control={control} value={getValues('start')}   onChange={onStartDateChange}  name='start' label={t("startDate")} />

</FormControl>
{getValues('start') && <FormControl fullWidth>
<DateInput control={control} value={getValues('end')}   start={getValues('start')} name='end' label={t("endDate")} />
</FormControl>
}

</Box>
<FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.start?.message}</FormHelperText>
  <ImageInput value={getValues('image')} setValue={setValue} country={getValues('country')} types={getValues("tags")} />
  {getValues('image').length<=0&&formState.isSubmitted&& <FormHelperText sx={{color:'#d32f2f'}}>I{t("errors.imageReq")}</FormHelperText>}
{isLoading?<CircularProgress size={'5rem'}/>:<UiButton disabled={!formState.isValid} clickFn={()=>{}}  submit size='small'>{t("changeBtn")}</UiButton>}
<FormHelperText sx={{color:'#d32f2f'}}>{typeof submitError === 'string'? submitError:''}</FormHelperText>
    </form>
  )
}

export default EditPlan