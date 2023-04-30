import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason,  Card, CardHeader, CardMedia,  CircularProgress,  FormControl, FormHelperText, TextField, useMediaQuery } from '@mui/material'
import React, {  useEffect, useState } from 'react'
import UiButton from '../ui/buttons/UiButton'

import styles from './NewPlan.module.css'
import states from '../../util/countriesList.min.json'
import codes from '../../util/codes.json'
import DateInput from '../ui/inputs/DateInput'
import { Box } from '@mui/system'
import SelectInput from '../ui/inputs/Select'
import {useSession} from 'next-auth/react'

import ImageInput from '../ui/inputs/ImageInput'
import { useForm } from 'react-hook-form'
import { FieldValues, SubmitHandler } from 'react-hook-form/dist/types'
import axios, { AxiosError } from 'axios'
import {useRouter} from 'next/router'
import Image from 'next/image'

 type Props = {}


 const names = [
 {label:"Adventure 🧭",value:'Adventure'},
  {label:'Beach & Relaxation 🏖',value:'Beach & Relaxation'},
  {label:"Business 💼",value:'Business'},
  {label:"Budget 💵",value:'Budget'},
  {label:"Backpacking 🎒",value:'Backpacking'},

  {label:'Culture & History 🗿',value:'Culture & History'},
  {label:"Cycling 🚴🏼‍♂️",value:'Cycling'},
  {label:'Diving 🤿',value:'Diving'},
  {label:'Food 🥐',value:'Food'},
  {label:'Family Vacation 🧑🏽‍🍼',value:'Family Vacation'},
  {label:'Honeymoons 🤵🏽👰🏽',value:'Honeymoons'},
  {label:'Hiking ⛺️',value:'Hiking'},
  {label:"Luxury 💎",value:'Luxury'},
  {label:"Road Trip 🛣",value:'Road Trip'},
  {label:"Romantic ❤️",value:'Romantic'},
  {label:'Shopping 🛍',value:'Shopping'},
 {label:'Skiing ⛷',value:'Skiing'},
{label:"Spa & Health 🧘🏼‍♀️",value:'Spa & Health'},
 {label:"Wildlife & Safaris 🐘",value:'Wildlife & Safaris'},
 
];


const NewPlan = (props: Props) => {
  const countries=['Africa','East Asia',"Oceania","Middle East","South America","Central America","North America","Europe",...Object.keys(states)]
  const {data:session}=useSession()
  const [selectedCountry,setSelectedCountry]=useState<null|string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<null|string>(null)
  const [selectedCities,setSelectedCities]=useState<null|string[]>(null)
const {register,handleSubmit,formState,setValue,control,setError,getValues }=useForm({defaultValues:{title:'',country:'',city:'',type:[],start:new Date(),end:new Date(),image:'',userId:"",budget:""},})
  const [startDate,setStartDate]=useState<null|Date>(new Date())
const router=useRouter()


 const onChange=(event: React.SyntheticEvent<Element, Event>, value: string | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string> | undefined)=>{
setSelectedCountry(value)
setValue('userId',session?.user?.id)
 }

 const onStartDateChange=(e:any)=>{
  setStartDate(e._d)

 }
 
 useEffect(()=>{
  setError('start',{message:'Start Date is after end date'})
if(selectedCountry===null)return;
const cities=[...new Set(states[selectedCountry])]
if(cities.length===0) {setSelectedCities(null); return};
setSelectedCities(cities)
 },[selectedCountry,setError])
 
 const submitHandler:SubmitHandler<FieldValues>=async(data)=>{
   if(data.type.length>3||data.start>data.end||getValues('image').length==0){return} 
  
   try {
     setIsLoading(true)
     const resoult= await axios.post(`/api/plan/newPlan`,data)
   if(resoult?.data?.success){
   router.push('/plans')
   }} catch (error) {
     if(error instanceof AxiosError){
       const errorMsg=error.response?.data?.error
       setSubmitError(errorMsg)
     }
   }
  
  console.log(data);

 }

const isMobile=useMediaQuery("(max-width:800px)")
 
 
 return (
    <div className={styles.background}>
      <Card  sx={{minWidth:'70%',width:'100%',backgroundColor:'white',justifyContent:'center',alignItems:'center',display:'flex',flexDirection:"column",position:'relative',overflow:'visible' }}>
      <CardMedia      image='/images/roundlogo.png' sx={{backgroundSize:isMobile?"contain":"cover",position:isMobile?'static':'absolute',top:'70%',left:"80%",width:isMobile? 150:230,height:isMobile?150:230}} />
        <CardHeader  title="Create Trip" sx={{textAlign:'center',textDecoration:'underline',marginTop:'3%',fontWeight:'bolder'}} />
<form className={styles.form}  onSubmit={handleSubmit(submitHandler)}>
  <FormControl fullWidth>
    <TextField   label="*Trip Name"  error={ typeof formState.errors.title?.message  === 'string'} {...register('title',{required:'Trip name is required',maxLength:{value:25,message:'Name must be max 25 cheracters'}})}  variant="outlined" fullWidth />
 <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.title?.message}</FormHelperText>
  </FormControl>
<Box width={'100%'} gap="10px"    display={'flex'}   >
  <FormControl fullWidth >
    <Autocomplete onChange={onChange}
    
  id="combo-box-demo"
  options={countries}
  renderOption={(props, option) => 
    {
      const code=Object.keys(codes).find(key => codes[key] === option);
      
    return(
    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
      <Image
        loading="lazy"
        width="20"
        height={'20'}
        src={code?`https://flagcdn.com/w20/${code.toLowerCase()}.png`:`https://flagcdn.com/w20/un.png`}
        
        alt=""
      />
      {option}
    </Box>
  )}
}
  renderInput={(params) => <TextField  error={typeof formState.errors.country?.message  === 'string'}  {...register('country',{required:'Country is required'})}      {...params}  label="*Country name here" />}/>
   <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.country?.message}</FormHelperText>
  </FormControl>
  {selectedCountry&& selectedCountry?.length>0 && selectedCities&& <FormControl fullWidth   >
    <Autocomplete
  id="combo-box-demo"
  options={selectedCities}
  
  renderInput={(params) => <TextField {...register('city')}       {...params}   label="City Name here" />}/>
  </FormControl>}
  </Box>

<SelectInput setValue={setValue}  inputRef={register}  data={names} />
<FormControl fullWidth>
    <TextField   label="Budget $"  error={typeof formState.errors.budget?.message  === 'string'||Number(getValues('budget'))<=0} type={'number'} {...register('budget',{valueAsNumber:true,min:{value:1,message:'We can not help you manage budget if you travel for free!'}})} />
    <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.budget?.message}</FormHelperText>
</FormControl>

<Box width={'100%'} gap="10px" display={'flex'}  >
  <FormControl fullWidth>
<DateInput control={control}   onChange={onStartDateChange}  name='start' label='*Start Date' />

</FormControl>
{startDate && <FormControl fullWidth>
<DateInput control={control}    start={startDate} name='end' label='*End Date' />
</FormControl>
}

</Box>
<FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.start?.message}</FormHelperText>
<ImageInput setValue={setValue} />
{getValues('image').length<=0&&formState.isSubmitted&& <FormHelperText sx={{color:'#d32f2f'}}>Image is Required</FormHelperText>}


{isLoading?<CircularProgress size={'5rem'}/>: <UiButton disabled={!formState.isValid} submit className={styles.submitBtn} clickFn={()=>{}} size='large' color='blue'>Create Trip</UiButton>}
<FormHelperText>{submitError}</FormHelperText>
</form>
      </Card>
    </div>
  )
}

export default NewPlan