import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason,  Button,  ButtonGroup,  Card, CardHeader, CardMedia,  CircularProgress,  FormControl, FormHelperText, MenuItem, Select, TextField, useMediaQuery } from '@mui/material'
import React, {  useEffect, useState } from 'react'
import UiButton from '../ui/buttons/UiButton'

import styles from './NewPlan.module.css'
 import states from '../../../public/util/countriesList.min.json'
import codes from '../../../public/util/codes.json'
import DateInput from '../ui/inputs/DateInput'
import { Box } from '@mui/system'
import SelectInput from '../ui/inputs/Select'
import {useSession} from 'next-auth/react'

import ImageInput from '../ui/inputs/ImageInput'
import { useForm } from 'react-hook-form'
import { FieldValues, SubmitHandler } from 'react-hook-form/dist/types'
import {useRouter} from 'next/router'
import Image from 'next/image'
import TravelBg from '../../../public/images/travelBg.webp'
import { NewSesstion } from '@/pages/api/auth/signup'
import ToolTip from '../ui/ToolTip'
import { useTranslation } from 'next-i18next'
import {useMutation} from '@tanstack/react-query'
import { postNewPlan } from '@/util/fetchers'
 type Props = {}

 export const tripCat = [
 {label:"Adventure 🧭",he:"🧭 הרפתקאה",value:'Adventure'},
  {label:'Beach & Relaxation 🏖',he:"🏖 בטן גב",value:'Beach & Relaxation'},
  {label:"Business 💼",he:"💼 עסקים",value:'Business'},
  {label:"Budget 💵",he:"💵 תקציב נמוך",value:'Budget'},
  {label:"Backpacking 🎒",he:"🎒 תרמילאות",value:'Backpacking'},

  {label:'Culture & History 🗿',he:"🗿 תרבות והיסטוריה",value:'Culture & History'},
  {label:"Cycling 🚴🏼‍♂️",he:"🚴🏼‍♂️ אופניים",value:'Cycling'},
  {label:'Diving 🤿',he:"🤿 צלילה",value:'Diving'},
  {label:'Food 🥐',he:"🥐 אוכל",value:'Food'},
  {label:'Family Vacation 🧑🏽‍🍼',he:"🧑🏽‍🍼 חופשה משפחתית",value:'Family Vacation'},
  {label:'Honeymoons 🤵🏽👰🏽',he:"🤵🏽👰🏽 ירח דבש",value:'Honeymoons'},
  {label:'Hiking ⛺️',he:"⛺️ מחנאות",value:'Hiking'},
  {label:"Luxury 💎",he:"💎 יוקרה",value:'Luxury'},
  {label:"Road Trip 🛣",he:"🛣 בדרכים",value:'Road Trip'},
  {label:"Romantic ❤️",he:"❤️ רומנטי",value:'Romantic'},
  {label:'Shopping 🛍',he:"🛍 קניות",value:'Shopping'},
 {label:'Skiing ⛷',he:"⛷ סקי",value:'Skiing'},
{label:"Spa & Health 🧘🏼‍♀️",he:"🧘🏼‍♀️ ספא ובריאות",value:'Spa & Health'},
 {label:"Wildlife & Safaris 🐘",he:"🐘 חיות וספארי",value:'Wildlife & Safaris'},
 
];
const newCodes=JSON.parse(JSON.stringify(codes))
const newStates=JSON.parse(JSON.stringify(states))

const NewCreatePlan = (props: Props) => {
  const {t}=useTranslation("form")
  const countries=['Africa','East Asia',"Oceania","Middle East","South America","Central America","North America","Europe",...Object.keys(states)]
  const {data:session}=useSession()
  const [selectedCountry,setSelectedCountry]=useState<null|string>(null)
  const [selectedCities,setSelectedCities]=useState<null|string[]|unknown[]>(null)
  const [step, setStep] = useState(0)
  const [startDate,setStartDate]=useState<null|Date>(new Date())
const {register,handleSubmit,formState,setValue,control,getValues }=useForm({mode:"all",defaultValues:{title:'',currency:'$',country:'',city:'',type:[],start:new Date(),end:new Date(),image:'',userId:"",budget:""},})
const router=useRouter()

const newSession:NewSesstion={...session}
const {mutate,isLoading,error}=useMutation({mutationFn:postNewPlan,onSuccess:()=>{router.push('/plans')}})


const onStartDateChange=(e:any)=>{
    setStartDate(e.$d)
  
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
 },[selectedCountry])
 

 const submitHandler:SubmitHandler<FieldValues>=(data)=>{
   if(data.type.length>3||data.start>data.end||getValues('image').length==0){return} 
  mutate(data)
 }

const isMobile=useMediaQuery("(max-width:800px)")
 
 
 return (

    <div className={styles.background}>
      <Image  priority src={TravelBg} placeholder='blur' alt='bg' style={{width:'100%',height:'100%',position:'absolute',objectFit:"cover"}}   sizes='150vh'/>
      <Card  sx={{minWidth:'70%',width:'100%',backgroundColor:'white',justifyContent:'center',alignItems:'center',display:'flex',flexDirection:"column",position:'relative',overflow:'visible' }}>
      <CardMedia      image='/images/roundlogo.svg' sx={{backgroundSize:isMobile?"contain":"cover",position:isMobile?'static':'absolute',top:'70%',left:"80%",width:isMobile? 150:230,height:isMobile?150:230}} />
        <CardHeader  title={t("createHeader")} sx={{textAlign:'center',textDecoration:'underline',marginTop:'3%',fontWeight:'bolder'}} />
<form className={styles.form}  onSubmit={handleSubmit(submitHandler)}>

    <Box  width={"600px"} maxWidth={"100%"} minWidth={"100%"} minHeight={"25vh"} height={"100%"} display={step===0? 'flex' : 'none'} flexDirection={"column"} justifyContent={"center"} rowGap={"25px"}>
  <FormControl fullWidth>
    <ToolTip title={t("nameTooltip")}>
  
    <TextField   label={"*"+t("name")}  error={ typeof formState.errors.title?.message  === 'string'} {...register('title',{required:t("errors.nameReq"),maxLength:{value:25,message:t("errors.nameMax")}})}  variant="outlined" fullWidth />
    </ToolTip>
 <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.title?.message}</FormHelperText>
  </FormControl>
  <ToolTip title={t("destinationTooltip")}>
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
  renderInput={(params) => <TextField  error={typeof formState.errors.country?.message  === 'string'}  {...register('country',{required:t("errors.countryReq")})}      {...params}  label={"*"+t("destination")} />}/>
  
   <FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.country?.message}</FormHelperText>
  </FormControl>
  {selectedCountry&& selectedCountry?.length>0 && selectedCities&& <FormControl fullWidth   >
    <Autocomplete
  id="combo-box-demo"
  options={selectedCities}
  
  renderInput={(params) => <TextField {...register('city')}       {...params}   label={t("city")} />}/>
  </FormControl>}
  </Box>
  </ToolTip>
  </Box>
 


<Box  width={"600px"} maxWidth={"100%"} minWidth={"100%"} minHeight={"25vh"} height={"100%"} display={step===1? 'flex' : 'none'} flexDirection={"column"} justifyContent={"center"} rowGap={"25px"}>
<ToolTip title={t("datesTooltip")}>
<Box width={'100%'} gap="10px" display={'flex'}  >
  <FormControl fullWidth>
<DateInput control={control}   onChange={onStartDateChange}  name='start' label={'*'+t("startDate")} />

</FormControl>
{startDate && <FormControl fullWidth>
<DateInput control={control}    start={startDate} name='end' label={'*'+t("endDate")} />
</FormControl>
}

</Box>
</ToolTip>
<FormHelperText sx={{color:'#d32f2f'}} >{formState.errors.start?.message}</FormHelperText>
<ToolTip title={t("budgetTooltip")}>
<Box display={"flex"} width={"100%"}>
<FormControl fullWidth sx={{flexBasis:'80%'}}>
    <TextField   label={t("budget")}  error={typeof formState.errors.budget?.message  === 'string'||Number(getValues('budget'))<=0} type={'number'} {...register('budget',{valueAsNumber:true,min:{value:1,message:t("errors.budgetReq")}})} />
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
<SelectInput setValue={setValue}  inputRef={register}  data={tripCat} />
</Box>


<Box width={"600px"} maxWidth={"100%"} minWidth={"100%"} minHeight={"25vh"} height={"100%"} display={step===3? 'flex' : 'none'} flexDirection={"column"} justifyContent={"space-evenly"} alignItems={"center"} rowGap={"25px"}>
<ImageInput setValue={setValue} country={`${getValues('city')},${getValues('country')}`} types={getValues('type')} />
{getValues('image').length<=0&&formState.isSubmitted&& <FormHelperText sx={{color:'#d32f2f'}}>{t("errors.imgReq")}</FormHelperText>}
<>
{isLoading?<CircularProgress size={'5rem'}/>: <UiButton disabled={!formState.isValid} submit className={styles.submitBtn} clickFn={()=>{}} size='large' color='blue'>{t("createBtn")}</UiButton>}
{error&& <FormHelperText>{String(error)}</FormHelperText>}
</>

</Box>

<ButtonGroup>
<Button disabled={step===0} onClick={()=>{setStep((step)=>step-1)}}>{t("back")}</Button>
<Button disabled={step===3} onClick={()=>{setStep((step)=>step+1)}}>{t("next")}</Button>
</ButtonGroup>
</form>
      </Card>
    </div>
  )
}

export default NewCreatePlan