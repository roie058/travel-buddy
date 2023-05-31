
import { AlertColor, Box, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import UiButton from '../ui/buttons/UiButton'
import styles from '../form/EditPlan.module.css'
import axios from 'axios'
import { PlanContext } from '@/context/plan-context'
import ToolTip from '../ui/ToolTip'
import { useTranslation } from 'next-i18next'

type Props = {open:boolean,onClose:()=>void,openSnackBar:(message: string, severity: AlertColor) => void}
const options=['car','public transport',"insurance","gifts","shopping","attractions","food","restaurants","other"]
const AddExpenseModal = (props: Props) => {
    const {register,formState,getValues,handleSubmit}=useForm({defaultValues:{name:'',category:'other',price:0,position:''}})
const [submitError, setSubmitError] = useState<undefined|string|unknown>()
const [isLoading, setIsLoading] = useState<boolean>(false)
const {t}=useTranslation('plan')

const planCtx = useContext(PlanContext)

const onSubmit=async(data:FieldValues)=>{
try {
    setIsLoading(true)
const {data:res} =await  axios.patch('/api/budget/addBudget',{planId:planCtx?.plan._id,data})
if(res.success){
    if(!planCtx?.plan){props.onClose();setIsLoading(false);   return}
    const position:'transportation'|'expenses'=data.position
planCtx?.plan?.budget[position].push(res.budget);
props.openSnackBar('Expense Added',"success")
props.onClose()
}

else{
    setSubmitError('Error try again')
}
} catch (error) {
    setSubmitError(error)
}
setIsLoading(false)
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
  <TextField fullWidth error={ typeof formState.errors.name?.message  === 'string'} {...register('name',{required:'Expense name is required',maxLength:{value:25,message:'Name must be max 25 cheracters'}})}  defaultValue={getValues('name')} label={ t("budget.form.input1")} />
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
<TextField   label={t("budget.form.input3")}  error={typeof formState.errors.price?.message  === 'string'||Number(getValues('price'))<=0} type={'number'} {...register('price',{valueAsNumber:true,min:{value:1,message:'We can not help you manage price if you travel for free!'}})} />
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