import { Box, Button, ButtonGroup, FormControl, FormControlLabel, ImageList, ImageListItem, ImageListItemBar, Radio, RadioGroup, Slider, Typography } from '@mui/material'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/dist/client/image'
import { useTranslation } from 'react-i18next'
import MonthInput from '../ui/inputs/MonthInput'


type Props = {}

const SuprisePlanForm = (props: Props) => {
  const {t}=useTranslation("form")
  const {register,getValues,setValue,control,formState}=useForm()
  const [step, setStep] = useState(0)

  console.log(getValues("budgetLevel"));
  
  return (
    <Box sx={{height:"calc(100vh - 60px)",mx:"10%"}}  textAlign={"center"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
      
    <Box  width={"600px"} maxWidth={"100%"}  minHeight={"25vh"} height={"100%"} display={step===0? 'flex' : 'none'} flexDirection={"column"} justifyContent={"center"} rowGap={"25px"}>
    <Typography variant="h1" fontSize={"3rem"}>When are we going?</Typography>
     <FormControl >
      <MonthInput onChange={(value)=>{setValue("date",value.format('MMMM YYYY'))}} label='Select Month' name='date' control={control}/>
     </FormControl>
  </Box>
  <Box  width={"600px"} maxWidth={"100%"}  minHeight={"25vh"} height={"100%"} display={step===1? 'flex' : 'none'} flexDirection={"column"} justifyContent={"center"} rowGap={"25px"}>
    <Typography variant="h1" fontSize={"3rem"}>Who are going?</Typography>
     <FormControl >
     <RadioGroup defaultValue={"Solo"} >
<ImageList sx={{width:'100%',height:"400px"}}>
  

  {[{title:"Solo",href:'/images/hiking.svg'},{title:'Couple',href:'/images/romantic.svg'},{title:'Group',href:'/images/group.svg'},{title:'Family',href:'/images/family.svg'}].map((company,i)=>
  <ImageListItem key={i}  >
 
<Image src={company.href} alt={company.title} fill  />
<ImageListItemBar sx={{backgroundColor:"rgba(138,74,243,0.9)"}}     title={<FormControlLabel {...register('company')} value={company.title} slotProps={{typography:{fontWeight:"bold"}}} sx={{fontWeight:"bold"}}  control={<Radio hidden color="default" />} label={company.title} />} /> 
  </ImageListItem>
  )}
  
</ImageList>
</RadioGroup>
     </FormControl>
  </Box>
  <Box  width={"600px"} maxWidth={"100%"} minWidth={"100%"} minHeight={"25vh"} height={"100%"} display={step===2? 'flex' : 'none'} flexDirection={"column"} justifyContent={"center"} rowGap={"25px"}>
    <Typography variant="h1" fontSize={"3rem"}>What is your budget?</Typography>
     <FormControl fullWidth>
<Slider {...register('budgetLevel')} min={0} max={1} step={0.5} />
     </FormControl>
  </Box>
  <Box  width={"600px"} maxWidth={"100%"} minWidth={"100%"} minHeight={"25vh"} height={"100%"} display={step===3? 'flex' : 'none'} flexDirection={"column"} justifyContent={"center"} rowGap={"25px"}>
    <Typography variant="h1" fontSize={"3rem"}>Type of trip</Typography>
     <FormControl fullWidth>

     </FormControl>
  </Box>
  

<ButtonGroup>
<Button disabled={step===0} onClick={()=>{setStep((step)=>step-1)}}>{t("back")}</Button>
<Button disabled={step===3} onClick={()=>{setStep((step)=>step+1)}}>{t("next")}</Button>
</ButtonGroup>

    </Box>
  )
}

export default SuprisePlanForm