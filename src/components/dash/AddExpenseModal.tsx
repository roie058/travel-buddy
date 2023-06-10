
import { AlertColor, Box, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import UiButton from '../ui/buttons/UiButton'
import styles from '../form/EditPlan.module.css'

import ToolTip from '../ui/ToolTip'
import { useTranslation } from 'next-i18next'
import {useMutation} from '@tanstack/react-query'
import { addExpense } from '@/util/fetchers'
import { useRouter } from 'next/router'
import { queryClient } from '@/pages/_app'

type Props = {open:boolean,onClose:()=>void,openSnackBar:(message: string, severity: AlertColor) => void}
const options=['car','public transport',"insurance","gifts","shopping","attractions","food","restaurants","other"]
const AddExpenseModal = (props: Props) => {
    const {register,formState,getValues,handleSubmit}=useForm({defaultValues:{name:'',category:'other',price:0,position:''}})
const [submitError, setSubmitError] = useState<undefined|string|unknown>()
const {t}=useTranslation('plan')
const {query}=useRouter()

 const {mutate,isLoading}=useMutation({mutationFn:addExpense,onSuccess:(data,v)=>{
   props.openSnackBar(t("snack.expenseAdd"),"success")
   queryClient.invalidateQueries(["plan",v.planId])
   props.onClose()

 },onError:()=>{
  setSubmitError(t("form.errors.submitError"))
 }
})

const onSubmit=async(data:FieldValues)=>{
mutate({data,planId:String(query.planId)})

}


  return (
    <Modal  open={props.open} sx={{zIndex:'10'}} onClose={props.onClose}><Box sx={ {position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxWidth:'500px',
    bgcolor: 'white',
   borderRadius:'30px',
    boxShadow: 24,
    p: 4,}}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {t("budget.button")}
      </Typography>
      <form  className={styles.form}  onSubmit={handleSubmit((data)=>{onSubmit(data);
      })}>
      <FormControl fullWidth>
  <TextField fullWidth error={ typeof formState.errors.name?.message  === 'string'} {...register('name',{required:t("form.errors.nameReq"),maxLength:{value:25,message:t("form.errors.nameMax")}})}  defaultValue={getValues('name')} label={ t("budget.form.input1")} />
  <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.name?.message}</FormHelperText>
</FormControl>

<FormControl fullWidth>
<InputLabel id='category'>{t("budget.form.input2")}</InputLabel>
  <Select label={'category'} labelId='category' {...register('category')} defaultValue={'other'}  >
    {
       options.map((option)=> <MenuItem key={option} value={option}>{option}</MenuItem>)
    }
    
  </Select>
  <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.category?.message}</FormHelperText>
</FormControl>

<FormControl fullWidth>
<TextField   label={t("budget.form.input3")}  error={typeof formState.errors.price?.message  === 'string'||Number(getValues('price'))<=0} type={'number'} {...register('price',{valueAsNumber:true,min:{value:1,message:t("form.errors.budget")}})} />
    <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.price?.message}</FormHelperText>
</FormControl>
<FormControl fullWidth    >
<ToolTip title={t("expenseFormToolTip")} right='0' top='0'>
<FormLabel  id="demo-radio-buttons-group-label">{t("budget.form.input4")}</FormLabel>
<RadioGroup   name="radio-buttons-group"   defaultValue={'expenses'} sx={{justifyContent:'center'}}   row >
    <FormControlLabel {...register('position')}  defaultChecked value="expenses" control={<Radio />} label={t("budget.expenses")} />
    <FormControlLabel {...register('position')} value="transportation"  control={<Radio />} label={t("budget.transportation")} />
   
</RadioGroup>
</ToolTip>
</FormControl>



  
  
{isLoading?<CircularProgress size={'5rem'}/>:<UiButton disabled={!formState.isValid} clickFn={()=>{}}  submit size='small'>{t("budget.form.button")}</UiButton>}
<FormHelperText sx={{color:'#d32f2f'}}>{typeof submitError === 'string'? submitError:'' }</FormHelperText>
    </form>
    </Box></Modal>
  )
}

export default AddExpenseModal