import { Card, CardHeader, CircularProgress, FormControl, FormHelperText, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import UiButton from '../ui/buttons/UiButton'
import { FieldValues, useForm } from 'react-hook-form'
import styles from './ForgetPass.module.css'
import RoundLogo from '../../../public/images/roundlogo.svg'
import { loginUser } from '@/util/authHelpars'
type Props = {}

const ChangePasswordForm = (props: Props) => {
const {query,push}=useRouter()
const {register,handleSubmit,formState}=useForm({defaultValues:{newPassword:'',testPassword:''}})
const [isLoading, setIsLoading] = useState(false)
const [submitError, setSubmitError] = useState<null|string>(null)
const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)

useEffect(()=>{
const checkToken=async ()=>{
    const {token,email}=query
try {
    const resoult= await axios.get(`/api/auth/password/changePassword`,{params:{token:token,email:email}})
   if(resoult.data.success){

   }else{
    push('/')  
   }
    
} catch (error) {
  push('/')  
}

}
if(query.token){
    checkToken()
}

},[query])


const submitHandler=async (data:FieldValues)=>{

    try {
        setIsLoading(true)
        const resoult= await axios.post(`/api/auth/password/changePassword`,{newPassword:data.newPassword,email:query.email})
       if(resoult.data.success){
   const status= await loginUser({email:String(query.email),password:data.newPassword})
   if(status.ok){
    push('/')  
   }
       }else{
        setSubmitError("somthing is not right try again")
       }
    } catch (error) {
        setSubmitError("somthing is not right try again")
    }
setIsLoading(false)
}
  return (
   
  <div className={styles.background}>
   {submitSuccess?<Card sx={{ minWidth:'300px',maxWidth:'500px',width:"100%",height:'100%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
      <Image width={200} height={200} alt='travel buddy' src={RoundLogo}/>
      <CardHeader titleTypographyProps={{color:'#00c2cb',}} title="Travel Buddy" sx={{height:'min-content',padding:'0 0 7% 0'}}  /> <Typography>Succsess🎉</Typography> <Typography>please check your inbox</Typography> </Card>  :<Card sx={{ minWidth:'300px',maxWidth:'500px',width:"100%",height:'100%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
      <Image width={200} height={200} alt='travel buddy' src={RoundLogo}/>
      <CardHeader titleTypographyProps={{color:'#00c2cb',}} title="Travel Buddy" sx={{height:'min-content',padding:'0 0 7% 0'}}  />
<form onSubmit={handleSubmit(submitHandler)} className={styles.form}>

<FormControl>
  <TextField  error={Boolean(formState.errors?.newPassword?.message)} name='New Password' fullWidth type='password' label="New password" {...register("newPassword",{required:'New password is required',minLength:{value:6,message:'Password must be at least 6 characters'},validate:{isEqual:(value,formValues)=> value===formValues.newPassword|| 'Passwords must be identical'}})} />
</FormControl>

<FormControl>
  <TextField  error={Boolean(formState.errors?.testPassword?.message)} name='repeat password' fullWidth type='password' label="Repeat password" {...register("testPassword",{required:'repeat password is required',minLength:{value:6,message:'Password must be at least 6 characters'},validate:{isEqual:(value,formValues)=> value===formValues.newPassword|| 'Passwords must be identical'}})} />
</FormControl>

{isLoading?<CircularProgress size={'5rem'}/>: <UiButton  submit clickFn={()=>{}} color='blue' >Change Password</UiButton>}
{submitError&& <FormHelperText onClick={()=>{setSubmitError(null)}}  sx={{color:'	#DC3545',textAlign:'center',borderRadius:'10px',cursor:'pointer',fontSize:'1rem'}}>{submitError}</FormHelperText>}
{(formState.errors?.newPassword?.message || formState.errors?.testPassword?.message) && <FormHelperText onClick={()=>{setSubmitError(null)}}  sx={{color:'	#DC3545',textAlign:'center',borderRadius:'10px',cursor:'pointer',fontSize:'1rem'}}>{formState.errors?.newPassword?.message??formState.errors?.testPassword?.message}</FormHelperText>}



</form>

    </Card>}
    </div>
   
  )
}

export default ChangePasswordForm