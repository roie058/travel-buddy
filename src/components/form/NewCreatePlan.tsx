import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason,  Button,  ButtonGroup,  Card, CardHeader, CardMedia,  CircularProgress,  FormControl, FormHelperText, MenuItem, Select, TextField, useMediaQuery } from '@mui/material'
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
import TravelBg from '../../../public/images/travelBg.webp'
import { NewSesstion } from '@/pages/api/auth/signup'
import ToolTip from '../ui/ToolTip'

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
const newCodes=JSON.parse(JSON.stringify(codes))
const newStates=JSON.parse(JSON.stringify(states))

const NewCreatePlan = (props: Props) => {
  const countries=['Africa','East Asia',"Oceania","Middle East","South America","Central America","North America","Europe",...Object.keys(states)]
  const {data:session}=useSession()
  const [selectedCountry,setSelectedCountry]=useState<null|string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<null|string>(null)
  const [selectedCities,setSelectedCities]=useState<null|string[]|unknown[]>(null)
  const [step, setStep] = useState(0)
  const [startDate,setStartDate]=useState<null|Date>(new Date())
const {register,handleSubmit,formState,setValue,control,setError,getValues }=useForm({mode:"all",defaultValues:{title:'',currency:'$',country:'',city:'',type:[],start:new Date(),end:new Date(),image:'',userId:"",budget:""},})
const router=useRouter()
const newSession:NewSesstion={...session}



const onStartDateChange=(e:any)=>{
    setStartDate(e._d)
  
   }

 const onChange=(event: React.SyntheticEvent<Element, Event>, value: string | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string> | undefined)=>{
setSelectedCountry(value)
if(!newSession.user?.id)return;
setValue('userId',newSession.user?.id)
 }


 useEffect(()=>{

if(selectedCountry===null)return;
const cities=new Set(newStates[selectedCountry])
if(cities.size===0) {setSelectedCities(null); return};
setSelectedCities([...cities])
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

 }

const isMobile=useMediaQuery("(max-width:800px)")
 
 
 return (
    <div className={styles.background}>
      <Image  priority src={TravelBg} alt='bg' style={{width:'100%',height:'100%',position:'absolute',objectFit:"cover"}}   sizes='150vh'/>
      <Card  sx={{minWidth:'70%',width:'100%',backgroundColor:'white',justifyContent:'center',alignItems:'center',display:'flex',flexDirection:"column",position:'relative',overflow:'visible' }}>
      <CardMedia      image='/images/roundlogo.svg' sx={{backgroundSize:isMobile?"contain":"cover",position:isMobile?'static':'absolute',top:'70%',left:"80%",width:isMobile? 150:230,height:isMobile?150:230}} />
        <CardHeader  title="Create Trip" sx={{textAlign:'center',textDecoration:'underline',marginTop:'3%',fontWeight:'bolder'}} />
<form className={styles.form}  onSubmit={handleSubmit(submitHandler)}>

    <Box  width={"600px"} maxWidth={"100%"} minWidth={"100%"} minHeight={"25vh"} height={"100%"} display={step===0? 'flex' : 'none'} flexDirection={"column"} justifyContent={"center"} rowGap={"25px"}>
  <FormControl fullWidth>
    <ToolTip title='name of the trip'>
  
    <TextField   label="*Trip Name"  error={ typeof formState.errors.title?.message  === 'string'} {...register('title',{required:'Trip name is required',maxLength:{value:25,message:'Name must be max 25 cheracters'}})}  variant="outlined" fullWidth />
    </ToolTip>
 <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.title?.message}</FormHelperText>
  </FormControl>
  <ToolTip title='Pick a destination for the trip'>
<Box width={'100%'} gap="10px"    display={'flex'}   >
  <FormControl fullWidth >
  
    <Autocomplete onChange={onChange}
    
  id="combo-box-demo"
  options={countries}
  renderOption={(props, option) => 
    {
      const code=Object.keys(codes).find(key => newCodes[key] === option);
      
    return(
    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} position={"relative"} {...props}>
      
      <img
        loading="lazy"
        width="20"
        src={code?`https://flagcdn.com/w20/${code.toLowerCase()}.webp`:`https://flagcdn.com/w20/un.webp`}
        srcSet={code?`https://flagcdn.com/w40/${code.toLowerCase()}.webp 2x`  :`https://flagcdn.com/w40/un.webp 2x`}
        alt={option}
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
  </ToolTip>
  </Box>
 


<Box  width={"600px"} maxWidth={"100%"} minWidth={"100%"} minHeight={"25vh"} height={"100%"} display={step===1? 'flex' : 'none'} flexDirection={"column"} justifyContent={"center"} rowGap={"25px"}>
<ToolTip title='pick the dates of your trip'>
<Box width={'100%'} gap="10px" display={'flex'}  >
  <FormControl fullWidth>
<DateInput control={control}   onChange={onStartDateChange}  name='start' label='*Start Date' />

</FormControl>
{startDate && <FormControl fullWidth>
<DateInput control={control}    start={startDate} name='end' label='*End Date' />
</FormControl>
}

</Box>
</ToolTip>
<FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.start?.message}</FormHelperText>
<ToolTip title='Travel buddy will help you keep track of your budget'>
<Box display={"flex"} width={"100%"}>
<FormControl fullWidth sx={{flexBasis:'80%'}}>
    <TextField   label="Budget"  error={typeof formState.errors.budget?.message  === 'string'||Number(getValues('budget'))<=0} type={'number'} {...register('budget',{valueAsNumber:true,min:{value:1,message:'We can not help you manage budget if you travel for free!'}})} />
    <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.budget?.message}</FormHelperText>
</FormControl>
<FormControl sx={{flexBasis:'20%'}} >
    <Select {...register('currency',{required:true})} renderValue={(value)=>value} defaultValue='$'>
      <MenuItem value="$">$ USD</MenuItem>
      <MenuItem value="£">£ GBP</MenuItem>
      <MenuItem value="€">€ EUR</MenuItem>
      <MenuItem value="₪">₪ ILS</MenuItem>
      <MenuItem value="¥">¥ JPY</MenuItem>
      <MenuItem value="₹">₹ INR</MenuItem>
      <MenuItem value="₽">₽ RUB</MenuItem>
      <MenuItem value="₩">₩ KRW</MenuItem>
     
    </Select>
    <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.budget?.message}</FormHelperText>
</FormControl>
</Box>
</ToolTip>
</Box>

<Box width={"600px"} maxWidth={"100%"} minWidth={"100%"} minHeight={"25vh"} height={"100%"} display={step===2? 'flex' : 'none'} flexDirection={"column"} justifyContent={"center"} rowGap={"25px"}>
<SelectInput setValue={setValue}  inputRef={register}  data={names} />
</Box>


<Box width={"600px"} maxWidth={"100%"} minWidth={"100%"} minHeight={"25vh"} height={"100%"} display={step===3? 'flex' : 'none'} flexDirection={"column"} justifyContent={"space-evenly"} alignItems={"center"} rowGap={"25px"}>
<ImageInput setValue={setValue} country={`${getValues('city')},${getValues('country')}`} types={getValues('type')} />
{getValues('image').length<=0&&formState.isSubmitted&& <FormHelperText sx={{color:'#d32f2f'}}>Image is Required</FormHelperText>}
<>
{isLoading?<CircularProgress size={'5rem'}/>: <UiButton disabled={!formState.isValid} submit className={styles.submitBtn} clickFn={()=>{}} size='large' color='blue'>Create Trip</UiButton>}
{submitError&& <FormHelperText>{typeof submitError === 'string'? submitError:''}</FormHelperText>}
</>

</Box>






<ButtonGroup>
<Button disabled={step===0} onClick={()=>{setStep((step)=>step-1)}}>Back</Button>
<Button disabled={step===3} onClick={()=>{setStep((step)=>step+1)}}>Next</Button>
</ButtonGroup>
</form>
      </Card>
    </div>
  )
}

export default NewCreatePlan