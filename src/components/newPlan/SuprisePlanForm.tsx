import { Box, Button, ButtonGroup, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, FormControl, FormControlLabel, FormLabel, IconButton, ImageList, ImageListItem, ImageListItemBar, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, Typography } from '@mui/material'

import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Image from 'next/dist/client/image'
import { useTranslation } from 'react-i18next'
import MonthInput from '../ui/inputs/MonthInput'
import SelectInput from '../ui/inputs/Select'
import { tripCat } from './NewPlanForm'
import { getRecommendations } from '@/util/aiHelpers'
import dayjs from 'dayjs'
import { useMutation } from '@tanstack/react-query'
import useSnackBar from '@/hooks/useSnackBar'
import SnackBar from '../ui/SnackBar'

  
 

type Props = {}
const marks=[{value:0,label:"Low"},{value:0.5,label:"Medium"},{value:1,label:"High"}]
const SuprisePlanForm = (props: Props) => {
  const {t}=useTranslation("form")
  const {register,getValues,setValue,control,handleSubmit}=useForm({defaultValues:{type:[],company:"Solo",budgetLevel:0.5,date:dayjs(new Date()).format("MMMM YYYY"),duration:"Weekend",climate:"humid continental"}})
  const [step, setStep] = useState(0)
  const [resultList, setResultList] = useState<[{description:string,destination:string}]>()
  const {setSnackBar,snackBarProps}=useSnackBar()
const {mutate,isLoading}=useMutation(
  {
    mutationFn:getRecommendations,
    onMutate:()=>{
      setSnackBar("Waiting To AI Result...","info")
    },
        onSuccess:(data)=>{
          setResultList(data)
          setSnackBar("Data found","success")
        },
    onError:()=>{
       setSnackBar("Server Error!","error")
    }
  }
)


const submitFn= async (data:FieldValues)=>{
  const newData={interests:String(data.type),company:data.company,budgetLevel:marks.find((mark)=>mark.value==parseInt(data.budgetLevel)).label+" budget",date:data.date,duration:"two weeks",climate:data.climate}
mutate(newData)
}
 


  console.log(getValues());
  
  return (
    <>
    {resultList?<Box margin={'10%'} >
      <Button onClick={()=>{setResultList(null);setStep(0)}} >Return</Button>
<Box justifyContent={"space-evenly"}   flexWrap={"wrap"} display={"flex"} alignItems={"stretch"} >
      {resultList.map((result)=>
<Card key={result.destination} sx={{width:"250px",display:"flex",flexDirection:"column",justifyContent:"space-between",my:"15px"}}>
  <Box>

  
  <CardMedia sx={{width:"100%",height:"150px"}} image={`https://source.unsplash.com/random/?${result.destination}`}/>
  <CardContent sx={{display: "flex",flexDirection:"column",alignItems:"center",height:"max-content"}}>
<Typography fontSize={"2rem"}  variant="h3">{result.destination}</Typography>
<Typography fontSize={"0.8rem"} variant="body1">{result.description}</Typography>

  </CardContent>
  </Box>
  <CardActions >
  <Button>Start Plan</Button>
  </CardActions>
</Card>

      )}
    </Box>
    </Box>
      :<form onSubmit={handleSubmit(submitFn,(error)=>{console.log(error);
    })}>
    <Box sx={{height:"calc(100vh - 60px)",mx:"10%"}}  textAlign={"center"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
    
    <Box  width={"600px"} maxWidth={"100%"}  minHeight={"25vh"} height={"100%"} display={step===0? 'flex' : 'none'} flexDirection={"column"} justifyContent={"center"} rowGap={"25px"}>
    <Typography variant="h1" fontSize={"3rem"}>When are we going?</Typography>
     <FormControl >
      <MonthInput onChange={(value)=>{setValue("date",value.format('MMMM YYYY'))}} label='Select Month' name='date' control={control}/>
     </FormControl>
     <FormControl fullWidth >
      <InputLabel id='duration'>Duration</InputLabel>
      <Select name='duration' {...register("duration")} defaultValue={"Weekend"} label="Duration"  labelId='duration' aria-label='Duration'  >
        {['1-4 days',"Weekend","Long weekend","One week","Two weeks",'Three weeks','One month','Two months+'].map((value)=><MenuItem value={value} >{value}</MenuItem>)}
      </Select>
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
<ImageListItemBar sx={{backgroundColor:"rgba(100,74,200,0.5)",border:"2px solid rgba(100,74,200,0.9) "}}     title={<FormControlLabel {...register('company')} value={company.title} slotProps={{typography:{fontWeight:"bold"}}} sx={{fontWeight:"bold"}}  control={<Radio hidden color="secondary" />} label={company.title} />} /> 
  </ImageListItem>
  )}
  
</ImageList>
</RadioGroup>
     </FormControl>
  </Box>
  <Box  width={"600px"} maxWidth={"100%"} minWidth={"100%"} minHeight={"25vh"} height={"100%"} display={step===2? 'flex' : 'none'} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} rowGap={"25px"}>
    <Typography variant="h1" fontSize={"3rem"}>What is your budget?</Typography>
     <FormControl sx={{width:'250px'}} >
<Slider  marks={marks} defaultValue={0.5}  {...register('budgetLevel')} min={0} max={1} step={0.5} />
     </FormControl>
  </Box>
  <Box  width={"600px"} maxWidth={"100%"} minWidth={"100%"} minHeight={"25vh"} height={"100%"} display={step===3? 'flex' : 'none'} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} rowGap={"25px"}>
    <Typography variant="h1" fontSize={"3rem"}>Type of trip</Typography>
    <Box width={500} >
    <SelectInput  setValue={setValue}  inputRef={register}  data={tripCat} />
    </Box>
<FormControl sx={{width:500}} >
<InputLabel id='climate' >Climate</InputLabel>
  <Select labelId='Climate' {...register("climate")} defaultValue={"humid continental"} label={"Climate"} >
   { [{value:"humid continental",label:"Humid continental"},{value:"tropical",label:"Tropical"},{value:"desert",label:"Desert"},{value:"mediterranean",label:"Mediterranean"},{value:"savanna",label:"Savanna"},{value:"alpine",label:"Alpine"},].map((option,i)=><MenuItem  value={option.value}>{option.label}</MenuItem>)}
  </Select>
</FormControl>
{isLoading? <CircularProgress/> :<Button type="submit">Submit</Button>}
  </Box>
  

<ButtonGroup sx={{marginBottom:"10%"}}>
<Button disabled={step===0} onClick={()=>{setStep((step)=>step-1)}}>{t("back")}</Button>
<Button disabled={step===3} onClick={()=>{setStep((step)=>step+1)}}>{t("next")}</Button>
</ButtonGroup>

    </Box>
    </form>
  }
  <SnackBar {...snackBarProps} />
  </>
  )
}

export default SuprisePlanForm