import { Autocomplete, Box, Button, Chip,  CircularProgress, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, InputLabel, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, MenuList, Pagination, Radio, RadioGroup, Select, Slider, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { BabyIcon, ChildIcon, PeopleIcon, PersonIcon, SwitchIcon } from '../svgComponents'
import { Plan } from '../pageCompnents/Schedule'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/dist/client/router'
import FlightDateInput from './FlightDateInput'
import dayjs from 'dayjs'
import {  useMutation } from '@tanstack/react-query'
import { getFlights } from '@/util/fetchers'
import FlightResult from './FlightResult'

import useSnackBar from '@/hooks/useSnackBar'
import SnackBar from '../ui/SnackBar'

type Props = {plan?:Plan,plans?:Plan[]}

export const currencys=[
  {symbol:"$",name: "USD"},
  {symbol:"£",name:"GBP"},
      {symbol:"€",name: "EUR"},
      {symbol:"₪",name: "ILS"},
      {symbol:"¥",name: "JPY"},
      {symbol:"₹",name: "INR"},
      {symbol:"₽",name: "RUB"},
      {symbol:"₩",name: "KRW"}
  ]

  function CustomTabPanel({children,value,index,...other}: {children?:React.ReactNode;index:  "price" | "duration" | "quality";value: "price" | "duration" | "quality";}) {
    return (
      <div
        role="tabpanel"
        hidden={value != index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{display:"flex",flexDirection:"column", p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
const FlightSearch = (props: Props) => {
  const [isReturn,setIsReturn]=useState(true)
  const {t}=useTranslation("flights")

  const {locale}=useRouter()
  const {control,register,setValue,getValues,handleSubmit,setError,formState,clearErrors}=useForm({defaultValues:{flyFrom:"",flyTo:"",start:props.plan?dayjs(props.plan.start).format("DD/MM/YYYY"):dayjs(new Date()).format("DD/MM/YYYY"),end:props.plan? dayjs(props.plan.end).format("DD/MM/YYYY"):dayjs(new Date()).format("DD/MM/YYYY"),adults:1,children:0,infants:0,priceFrom:0,priceTo:50000,maxStopovers:2}})
  const [airportsData,setAirportsData]=useState<Array<{name:string,id:string}>>([])
  const [page,setPage]=useState<number>(1)
  const [results,setResults]=useState<any[]>()
  const [sort, setSort] = React.useState<"price"|"duration"|"quality">("quality");
  const [range, setRange] = useState([0,10000])
  const [passengers, setPassengers] = useState<{adults?:number,children?:number,infants?:number}>({adults:1,children:0,infants:0})
  const [menuOpen, setMenuOpen] = useState(false)
  const {setSnackBar,snackBarProps}=useSnackBar()
  const menuRef=useRef()
  const [searchSettings,setSearchSettings]=useState<{curr:string,flyFrom:string,flyTo:string,dateFrom:string,returnFrom:string,adults?:number,children?:number,infants?:number,priceFrom:number,priceTo:number,maxStopovers?:number,sort:"price"|"duration"|"quality"}>()

//props.plan
const currency=props.plan?.budget?.currency??'€';
  const {data,mutate,isLoading}=useMutation({mutationFn:getFlights,
    onSuccess:(data)=>{  
      setSnackBar(`${data.data.length} ${t("snack.resultsFound")}`,"success")
      return data.data
    },
    onError:()=>{
      setSnackBar(t("snack.error"),"error")
    }
  })
  const onStartDateChange=(e:any,name:"start"|"end")=>{ 
      clearErrors(name)

    setValue(name,dayjs(e).format('DD/MM/YYYY'))

   }
useEffect(()=>{
  if(data){
    setResults(data.data.reduce((memo, value, index) => {
      if (index % 5 === 0 && index !== 0) memo.push([])
      memo[memo.length - 1].push(value)
      return memo
    }, [[]]))
       }
if(passengers.adults+passengers.children+passengers.infants<=9&&formState?.errors?.adults){
  clearErrors("adults")
}

},[data,passengers])
   

   const switchHandler=()=>{
    const flyFrom=getValues("flyFrom")
    const flyTo=  getValues("flyTo")
    setValue("flyFrom",flyTo)
    setValue("flyTo",flyFrom)
   }

 
   const autoCompleteHandler:ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>=async(e)=>{   
    if(process?.env?.KIWI_KEY && e.target?.value!==""){
      const {data} =await axios.get(`https://api.tequila.kiwi.com/locations/query`,{headers:{apikey:process?.env?.KIWI_KEY},params:{term:e.target?.value,locale:locale==="he"?"iw-IL":"en-US"}})


      setAirportsData(data.locations)
    }
  
    }
    const changeHandler=async(inputName:'flyFrom'|'flyTo',value: {
        name: string;
        id: string;
    } | null)=>{ 
      clearErrors(inputName)
        if(value){
            setValue(inputName,value.id) 
            setAirportsData([])
        }else return;
        }


      const searchFlights=(data:FieldValues)=>{  
         
      if(dayjs(data.start,'DD/MM/YYYY').isBefore(new Date())){
return setError("start",{message:t("errors.dateError")});
      }     
      if(data.adults===0||data.adults+data.children+data.infants>9){
        return setError("adults",{message:t("errors.passError")});
      }
      setPage(1)
        setSearchSettings({dateFrom:data.start,returnFrom:data.end,flyFrom:data.flyFrom,flyTo:data.flyTo,priceFrom:data.priceFrom,priceTo:data.priceTo,infants:data.infants,adults:data.adults,children:data.children,maxStopovers:data.maxStopovers,curr:currencys.find((curr)=>curr.symbol===currency).name,sort})
    mutate({dateFrom:data.start,returnFrom:data.end,flyFrom:data.flyFrom,flyTo:data.flyTo,priceFrom:data.priceFrom,priceTo:data.priceTo,infants:data.infants,adults:data.adults,children:data.children,maxStopovers:data.maxStopovers,curr:currencys.find((curr)=>curr.symbol===currency).name,sort})
    }

    const handleChange = (event: React.SyntheticEvent, newValue:"price"|"duration"|"quality") => {
      const type= ["quality","price","duration"]
      
      setSort(type[newValue]);
      setSearchSettings((search)=>({...search,sort:type[newValue]}))
    mutate({...searchSettings,sort:type[newValue]})
    };

  return (
    <>
    <form onSubmit={handleSubmit(searchFlights,(errors)=>console.log(errors))}>
      <Grid container gap={1} mx={"10%"} maxWidth={"80%"} >
<Grid container item xs={12} display={"flex"} alignItems={"center"} >
  <Grid item minWidth={220}   md={1.7} >
<RadioGroup  onChange={(e,value)=>{if(value==="return"){setIsReturn(true);setValue("end",getValues('start'))}else{setIsReturn(false);setValue("end",null)}}} defaultValue={"return"} row >
<FormControlLabel  value="oneWay" control={<Radio />} label={t("oneWay")}  />
    <FormControlLabel value="return" control={<Radio />} label={t("return")} />
</RadioGroup>
</Grid>
<FormControl  >

<InputLabel >{t("maxStops")} </InputLabel>
<Select  size="small" sx={{height:44}} label={t("maxStops")}  defaultValue={2} {...register("maxStopovers")}>
<MenuItem value={0} >{t("direct")}</MenuItem>
<MenuItem value={1} >1 {t("stop")}</MenuItem>
<MenuItem defaultChecked value={2} >2 {t("stops")}</MenuItem>
<MenuItem value={5} >{t("noLimit")}</MenuItem>
</Select>
</FormControl>
<Button ref={menuRef}  onClick={()=>setMenuOpen(true)}><Chip icon={<PeopleIcon height={30} width={30} fill='gray'/>} sx={{fontWeight:"bold"}} label={((getValues("adults")??0)+(getValues("children")??0)+(getValues("infants")??0))}  /> </Button>
<Menu anchorEl={menuRef.current}  open={menuOpen} onClose={()=>setMenuOpen(false)} >
  <MenuList>
    <ListSubheader sx={{fontWeight:"bold",color:"black",fontSize:"1rem"}}>{t("passengers")}</ListSubheader>
<MenuItem key={"adults"}>
<ListItemIcon><PersonIcon height={30} width={30} fill='gray'/></ListItemIcon>

   <ListItemText>
    <Box display={"flex"} flexDirection={"column"}>
      <Typography variant="body1" fontWeight={"bold"} >{t("adults")}</Typography>
      <Typography variant="caption" color={"GrayText"}>{t("over")} 11</Typography>
    </Box>
    </ListItemText>
<Box>
<Button disabled={passengers.adults<=1} onClick={()=>{setValue("adults",getValues("adults")-1);setPassengers((pass)=>({...pass,adults:pass.adults-1}))}}>-</Button>
{passengers.adults}
<Button onClick={()=>{setValue("adults",getValues("adults")+1);setPassengers((pass)=>({...pass,adults:pass.adults+1}))}}>+</Button>
</Box>
   </MenuItem>
   <MenuItem key={"children"}>
<ListItemIcon><ChildIcon height={22} width={30} fill='gray'/></ListItemIcon>

   <ListItemText>
    <Box display={"flex"} flexDirection={"column"}>
      <Typography variant="body1" fontWeight={"bold"} >{t("children")}</Typography>
      <Typography variant="caption" color={"GrayText"}>2 - 11</Typography>
    </Box>
    </ListItemText>
<Box>
<Button disabled={passengers.children<=0} onClick={()=>{setValue("children",getValues("children")-1);setPassengers((pass)=>({...pass,children:pass.children-1}))}}>-</Button>
{passengers.children}
<Button onClick={()=>{setValue("children",getValues("children")+1);setPassengers((pass)=>({...pass,children:pass.children+1}))}}>+</Button>
</Box>
   </MenuItem>
   <MenuItem key={"infants"}>
<ListItemIcon><BabyIcon height={20} width={30} fill='gray'/></ListItemIcon>

   <ListItemText>
    <Box display={"flex"} flexDirection={"column"}>
      <Typography variant="body1" fontWeight={"bold"} >{t("infants")}</Typography>
      <Typography variant="caption" color={"GrayText"}>{t("under")} 2</Typography>
    </Box>
    </ListItemText>
<Box>
<Button disabled={passengers.infants<=0} onClick={()=>{setValue("infants",getValues("infants")-1);setPassengers((pass)=>({...pass,infants:pass.infants-1}))}}>-</Button>
{passengers.infants}
<Button onClick={()=>{setValue("infants",getValues("infants")+1);setPassengers((pass)=>({...pass,infants:pass.infants+1}))}}>+</Button>
</Box>
   </MenuItem>
  </MenuList>
</Menu>

</Grid>
<Grid container item xs={12} md={12} xl={5.25}  >
<Grid item xs={12} md={5.75}  >
<FormControl fullWidth >
      <Autocomplete filterOptions={(x)=>x}  isOptionEqualToValue={(option,value)=>option.id===value.id} onChange={(e,value)=>{changeHandler('flyFrom',value)}}   options={airportsData??[]} getOptionLabel={(option)=>option.id} renderOption={(props, option) => 
        {
        return(
        <Box component="li"  {...props}>
          <option value={option.id}>
          {option.name}
          </option>
          
        </Box>
      )}
    }  renderInput={(params)=><TextField {...register("flyFrom",{required:t("errors.originReq")})}  onChange={autoCompleteHandler}   label={t("origin")} {...params}  />} />
{formState.errors.flyFrom&&<FormHelperText sx={{color:"red"}}>{formState.errors.flyFrom.message}</FormHelperText>}
</FormControl>
</Grid>
<Grid position={"relative"} item xs={12} md={0.5}   alignItems={"center"}  justifyContent={"center"} display={"flex"}  >
<IconButton sx={{position:"absolute",background:"lightGray",zIndex:1}} onClick={switchHandler} ><SwitchIcon height={25} width={25}/></IconButton>
</Grid>
<Grid  item xs={12} md={5.75}   >
<FormControl fullWidth>
<Autocomplete filterOptions={(x)=>x}  isOptionEqualToValue={(option,value)=>option.id===value.id} onChange={(e,value)=>{changeHandler('flyTo',value)}}   options={airportsData??[]} getOptionLabel={(option)=>option.id} renderOption={(props, option) => 
        {
        return(
        <Box component="li"  {...props}>
          <option value={option.id}>
          {option.name}
          </option>
          
        </Box>
      )}
    }  renderInput={(params)=><TextField {...register("flyTo",{required:t("errors.dstReq")})}    onChange={autoCompleteHandler}   label={t("destination")} {...params}  />} />
{formState.errors.flyTo&&<FormHelperText sx={{color:"red"}}>{formState.errors.flyTo.message}</FormHelperText>}
</FormControl>

</Grid>


</Grid>


<Grid display={"flex"}   flexWrap={"wrap"}  item xs={12} md={12} xl={5.25}  >
  <Grid item md={isReturn? 5.9 :12} xs={12}>
  <FormControl fullWidth  >
<FlightDateInput value={getValues('start')}  onChange={onStartDateChange} label={t("departure")} name='start' control={control}/>
{formState.errors.start&&<FormHelperText sx={{color:"red"}}>{formState.errors.start.message}</FormHelperText>}
</FormControl>
  </Grid>
  {isReturn && <Grid item md={0.2}></Grid>}
  <Grid item md={5.9} xs={12}>
  {isReturn  && <FormControl fullWidth  >
<FlightDateInput  value={getValues('end')} start={getValues('start')} onChange={onStartDateChange}  label={t("return")} name='end' control={control}/>
</FormControl>}
  </Grid>


</Grid>

<Grid item xs={12}   xl={1.3} display={"flex"} height={56}  >{isLoading? <CircularProgress/> : <Button  fullWidth type="submit" sx={{borderRadius:"5px",textTransform:"capitalize",color:"white",background: "linear-gradient(51deg, rgba(0,194,202,1) 0%, rgba(55,193,199,1) 100%)"}} >{t("searchFlights")}</Button>}</Grid>

      </Grid>
      {formState.errors.adults&&<FormHelperText sx={{color:"red",marginX:"10%"}}>{formState?.errors.adults.message}</FormHelperText>}
      <Box display={"flex"} flexDirection={"column"} marginX={"10%"} marginY={"3%"}  justifyContent={"center"} >
  <Box  width={"20%"} >
  <FormControl  fullWidth>
    <FormLabel sx={{paddingBottom:"10%"}}>{t("priceRange")}</FormLabel>
    <Typography textAlign={"center"} >{range[0]+currency+" - "+range[1]+currency}</Typography>
    <Slider
  onChange={(e,value:number[])=>{setRange(value); setValue("priceFrom",value[0]);setValue("priceTo",value[1])}}
  value={range}
  valueLabelDisplay="auto"
  valueLabelFormat={(value)=>value+currency}
  max={10000}
  
  min={0}
  disableSwap
/>
  </FormControl>
</Box>  

</Box>
    </form>

     <Box marginBottom={"10vh"} >
     {results&&<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider',justifyContent:"center",display:"flex" }}>
        <Tabs value={["quality","price","duration"].indexOf(sort)} onChange={handleChange}>
          <Tab sx={{textTransform:"capitalize"}} label={t("best")}  id={`simple-tab-quality`} aria-controls={`simple-tabpanel-quality`} />
          <Tab sx={{textTransform:"capitalize"}} label={t("cheapest")}   id={`simple-tab-price`} aria-controls={`simple-tabpanel-price`} />
          <Tab sx={{textTransform:"capitalize"}} label={t("fastest")}    id={`simple-tab-duration`} aria-controls={`simple-tabpanel-duration`} />
        </Tabs>
      </Box>
      <CustomTabPanel value={sort} index={"quality"}>
      {isLoading ? <CircularProgress  /> :<>{ results[page-1].map((flight)=><FlightResult setSnackBar={setSnackBar}  plan={props.plan??props.plans} key={flight.id} currency={currency} result={flight}/>)}
<Pagination sx={{alignSelf:"center"}} onChange={(e,page)=>setPage(page)} page={page} count={results.length} /></>}
      </CustomTabPanel>
      <CustomTabPanel value={sort} index={"duration"}>
      {isLoading ? <CircularProgress  /> :<>{ results[page-1].map((flight)=><FlightResult setSnackBar={setSnackBar}  plan={props.plan??props.plans} key={flight.id} currency={currency} result={flight}/>)}
<Pagination sx={{alignSelf:"center"}} onChange={(e,page)=>setPage(page)} page={page} count={results.length} /></>}
      </CustomTabPanel>
      <CustomTabPanel value={sort} index={"price"}>
      {isLoading ? <CircularProgress  /> :<> { results[page-1].map((flight)=><FlightResult setSnackBar={setSnackBar}  plan={props.plan??props.plans} key={flight.id} currency={currency} result={flight}/>)}
<Pagination sx={{alignSelf:"center"}} onChange={(e,page)=>setPage(page)} page={page} count={results.length} /></>}

      </CustomTabPanel>
</Box>} 
    </Box>
    <SnackBar {...snackBarProps} />
    </>
  )
}

export default FlightSearch