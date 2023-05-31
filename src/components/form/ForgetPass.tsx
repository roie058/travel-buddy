

import {  Card, CardContent, CardHeader,  CircularProgress,  FormControl, FormHelperText, TextField, Typography } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import React, {  FormEventHandler, useState } from 'react'
import UiButton from '../ui/buttons/UiButton'

import styles from './ForgetPass.module.css'

import Image from 'next/image'
import RoundLogo from '../../../public/images/roundlogo.svg'
import { FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'next-i18next'

type Props = {}

const ForgetPass = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<null|string>(null)
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)

 const {t}= useTranslation('auth')
const {register,formState,handleSubmit}=useForm({defaultValues:{email:''}})




const submitHandler=async (data:FieldValues)=>{

        try {
          setIsLoading(true)
          const resoult= await axios.post(`/api/auth/password/sendEmail`,{email: data.email})
        if(resoult?.data?.success){
 setSubmitSuccess(true)

        }} catch (error) {
          if(error instanceof AxiosError){
            const errorMsg=error.response?.data?.error
            setSubmitError(errorMsg)
          }
        }

  setIsLoading(false) 
  
}

  return (
    <div className={styles.background}>
   {submitSuccess?<Card sx={{ minWidth:'300px',maxWidth:'500px',width:"100%",height:'100%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
      <Image width={200} height={200} alt='travel buddy' src={RoundLogo}/>
      <CardHeader titleTypographyProps={{color:'#00c2cb',}} title="Travel Buddy" sx={{height:'min-content',padding:'0 0 7% 0'}}  /> <Typography>{t('success')}🎉</Typography> <Typography>{t("inbox")}</Typography> </Card>  :
      <Card sx={{ minWidth:'300px',maxWidth:'500px',width:"100%",height:'100%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
      <Image width={200} height={200} alt='travel buddy' src={RoundLogo}/>
      <CardHeader titleTypographyProps={{color:'#00c2cb',}} title="Travel Buddy" sx={{height:'min-content',padding:'0 0 7% 0'}}  />
<form onSubmit={handleSubmit(submitHandler)} className={styles.form}>

<FormControl>
  <TextField  error={submitError===t("requiredEmail")} name='email' fullWidth inputMode='email' label={t('input2')} {...register('email',{required:t('requiredEmail'),pattern:{value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,message:t('emailValid')}})} />
</FormControl>


{isLoading?<CircularProgress size={'5rem'}/>: <UiButton  submit clickFn={()=>{}} color='blue' >{isLoading?'Loading...':t('recovery')}</UiButton>}
{submitError&& <FormHelperText onClick={()=>{setSubmitError(null)}}  sx={{color:'	#DC3545',textAlign:'center',borderRadius:'10px',cursor:'pointer',fontSize:'1rem'}}>{submitError}</FormHelperText>}
{formState.errors?.email?.message&& <FormHelperText onClick={()=>{setSubmitError(null)}}  sx={{color:'	#DC3545',textAlign:'center',borderRadius:'10px',cursor:'pointer',fontSize:'1rem'}}>{formState.errors?.email?.message}</FormHelperText>}


</form>

    </Card>}
    </div>
  )
}

export default ForgetPass