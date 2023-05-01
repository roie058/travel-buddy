
import { Box, CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import UiButton from '../ui/buttons/UiButton'
import styles from '../form/EditPlan.module.css'
import axios from 'axios'
import { PlanContext } from '@/context/plan-context'

type Props = {open:boolean,onClose:()=>void}
const options=['car','public transport',"insurance","gifts","shopping","attractions","food","restaurants","other"]
const AddExpenseModal = (props: Props) => {
    const {register,formState,getValues,handleSubmit}=useForm({defaultValues:{name:'',category:'other',price:0,position:''}})
const [submitError, setSubmitError] = useState<undefined|string|unknown>()
const [isLoading, setIsLoading] = useState<boolean>(false)


const planCtx = useContext(PlanContext)

const onSubmit=async(data:FieldValues)=>{
try {
    setIsLoading(true)
const {data:res} =await  axios.patch('/api/budget/addBudget',{planId:planCtx?.plan._id,data})
if(res.success){
    if(!planCtx?.plan){props.onClose();setIsLoading(false);   return}
    const position:'transportation'|'expenses'=data.position
planCtx?.plan?.budget[position].push(res.budget);
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
        Add Expense
      </Typography>
      <form  className={styles.form}  onSubmit={handleSubmit((data)=>{onSubmit(data);
      })}>
      <FormControl fullWidth>
  <TextField fullWidth error={ typeof formState.errors.name?.message  === 'string'} {...register('name',{required:'Trip name is required',maxLength:{value:25,message:'Name must be max 25 cheracters'}})}  defaultValue={getValues('name')} label="Change Name" />
  <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.name?.message}</FormHelperText>
</FormControl>
<FormControl fullWidth>
  <Select  label={'Label'}  {...register('category')} defaultValue={'other'}  >
    {
       options.map((option)=> <MenuItem key={option} value={option}>{option}</MenuItem>)
    }
    
  </Select>
  <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.category?.message}</FormHelperText>
</FormControl>
<FormControl fullWidth>
<TextField   label="Price"  error={typeof formState.errors.price?.message  === 'string'||Number(getValues('price'))<=0} type={'number'} {...register('price',{valueAsNumber:true,min:{value:1,message:'We can not help you manage price if you travel for free!'}})} />
    <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.price?.message}</FormHelperText>
</FormControl>
<FormControl fullWidth    >
<FormLabel  id="demo-radio-buttons-group-label">Type</FormLabel>
<RadioGroup   name="radio-buttons-group"   defaultValue={'expenses'} sx={{justifyContent:'center'}}   row >
    <FormControlLabel {...register('position')}  defaultChecked value="expenses" control={<Radio />} label="Expenses" />
    <FormControlLabel {...register('position')} value="transportation"  control={<Radio />} label="Transportation" />
   
</RadioGroup>
</FormControl>




  
  
{isLoading?<CircularProgress size={'5rem'}/>:<UiButton disabled={!formState.isValid} clickFn={()=>{}}  submit size='small'>Add</UiButton>}
<FormHelperText sx={{color:'#d32f2f'}}>{typeof submitError === 'string'? submitError:'' }</FormHelperText>
    </form>
    </Box></Modal>
  )
}

export default AddExpenseModal