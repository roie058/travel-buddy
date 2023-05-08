import { loginUser } from '@/util/authHelpars'

import { Button, Card, CardHeader, CardMedia, Chip, CircularProgress, Divider, FormControl, FormHelperText, TextField, Typography } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import React, {  FormEventHandler, MouseEventHandler, useRef, useState } from 'react'
import UiButton from '../ui/buttons/UiButton'
import {useSession,signIn} from 'next-auth/react'
import styles from './Auth.module.css'
import { Box } from '@mui/system'
import { GoolgeIcon } from '../svgComponents'
import Image from 'next/image'
import RoundLogo from '../../../public/images/roundlogo.svg'
type Props = {}

const Auth = (props: Props) => {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<null|string>(null)
  const router =useRouter()
const {data:session}=useSession()
const fullNameRef=useRef<any>()
const emailRef=useRef<any>()
const passwordRef=useRef<any>()
const changeFormHandler:MouseEventHandler<HTMLSpanElement>=(e)=>{
e.preventDefault()
setIsLogin(!isLogin)
}

const submitHandler:FormEventHandler<HTMLFormElement>=async (e)=>{
  e.preventDefault()

  if(isLogin){
    const user={ email:emailRef?emailRef.current?.value:null,
      password:passwordRef?passwordRef.current?.value:null,}
    try {
      setIsLoading(true)
      const loginRes=await loginUser({email:user.email,password:user.password})
if(loginRes && !loginRes.ok ){
  setSubmitError(loginRes.error||null)
}else{
router.push('/')
}
    } catch (error) {
      if(error instanceof AxiosError){
        const errorMsg=error.response?.data?.error
        setSubmitError(errorMsg)
      }
    }
  }else{
const user={ fullName:fullNameRef?fullNameRef.current?.value:null,
email:emailRef?emailRef?.current?.value:null,
password:passwordRef?passwordRef?.current?.value:null}
try {
  setIsLoading(true)
  const resoult= await axios.post(`/api/auth/signup`,user)
if(resoult?.data?.success){


 const loginRes=await loginUser({email:user.email,password:user.password})
if(loginRes && !loginRes.ok ){
  setSubmitError(loginRes.error||null)
}else{
router.push('/')
}}} catch (error) {
  if(error instanceof AxiosError){
    const errorMsg=error.response?.data?.error
    setSubmitError(errorMsg)
  }
}

  }
  setIsLoading(false) 
  
}

  return (
    <div className={styles.background}>
    <Card sx={{marginTop:'57px', minWidth:'300px',maxWidth:'500px',width:"100%",height:'100%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
      <Image width={200} height={200} alt='travel buddy' src={RoundLogo}/>
      <CardHeader titleTypographyProps={{color:'#00c2cb',}} title="Travel Buddy" sx={{height:'min-content',padding:'0 0 7% 0'}}  />
<form onSubmit={submitHandler} className={styles.form}>
{!isLogin && 
<FormControl>
  <TextField inputRef={fullNameRef} error={submitError==='Fullname is required'}  name='fullName' fullWidth inputMode='text' label="Full Name" />
</FormControl>
}
<FormControl>
  <TextField inputRef={emailRef} error={submitError==='Email is required'} name='email' fullWidth inputMode='email' label="Email" />
</FormControl>


<FormControl>
  <TextField inputRef={passwordRef} name='password' error={submitError==='Password must be at least six characters long'} fullWidth type={'password'} label="Password" />
</FormControl>

{isLoading?<CircularProgress size={'5rem'}/>: <UiButton  submit clickFn={()=>{}} color='blue' >{isLoading?'Loading...':isLogin?'Login':'Signup'}</UiButton>}
{submitError&& <FormHelperText onClick={()=>{setSubmitError(null)}}  sx={{color:'	#DC3545',textAlign:'center',borderRadius:'10px',cursor:'pointer',fontSize:'1rem'}}>{submitError}</FormHelperText>}
<Typography onClick={changeFormHandler}  className={styles.changeForm} textAlign={'center'} color={'GrayText'} sx={{textDecoration:'underline',textDecorationColor:'GrayText'}} >{isLogin?'Create New Account':'Already Have Account'}</Typography>

</form>

<Box mt={3} mb={3} width={"80%"} display="flex" flexDirection={'column'} gap="15px"  >
  <div>
  <Divider ><Chip label="Or"/></Divider>
  </div>
<Button variant="outlined"   sx={{textTransform:'capitalize', color:'#7b7e84',borderColor:'#7b7e8430'}} startIcon={<GoolgeIcon width={25} height={25}/>} onClick={()=>signIn('google',{callbackUrl:'/'})} >Continue with Google</Button>
</Box>

    </Card>
    </div>
  )
}

export default Auth