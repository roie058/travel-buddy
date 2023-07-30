import dynamic from 'next/dynamic'
import { Autocomplete, Box, Divider, FormControl, FormHelperText, TextField } from '@mui/material'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import ToolTip from '../ui/ToolTip'
  const  Image= dynamic(()=>import('next/image'), {
    loading: () => <p>Loading...</p>,
  })
import DateTimeInput from '../ui/inputs/DateTimeInput'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import {useRouter} from 'next/router'
import { Control, FormState, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { Flight } from './AddFlightModal'


type Props = {
formState:FormState<Flight>,
register:UseFormRegister<Flight>
index:number,
control:Control<Flight, any>,
getValues:UseFormGetValues<Flight>,
setValue:UseFormSetValue<Flight>
}

const SingleFlightEditForm = ({formState,control,register,setValue,index,getValues}: Props) => {
    const{t}=useTranslation("flights")
    const {locale}=useRouter()
    const [airportsData,setAirportsData]=useState<Array<{name:string,code:string}>>([])
    const [allAirlines, setAllAirlines] = useState<any[]>()

    useEffect(() => {
        import('../../../public/util/airLines.json').then(data => {
            const allAirlines=Object.keys(data).map((id)=>data[id])
            setAllAirlines(allAirlines);
        });
      }, []);

    const autoCompleteHandler:ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>=async(e)=>{  
        if(e.target.value.length===0)return 
      const {data} =await axios.get(`https://api.tequila.kiwi.com/locations/query`,{headers:{apikey:process?.env?.KIWI_KEY},params:{term:e.target?.value,location_types:"airport",locale:locale==="he"?"iw-IL":"en-US"}})
      
      setAirportsData(data.locations)
      }

      const changeHandler=async(inputName:'origin'|'destination'|'airline',value: {
        name: string;
        code?: string;
        location?:{lat: number, lon: number},
        iata?:string,
        country?:string
    } | null)=>{ 
        if(value){
        let newValue:any=value  
        if(inputName!=='airline'){
          newValue={name:value.name,iata:value.code,lat:value.location.lat,lng:value.location.lon}
            }
        switch (inputName) {
          case 'airline':
            setValue(`flightDetails.${index}.airline`,newValue.iata) 
            setValue(`airline.${index}`,newValue.iata) 
            break;
            case 'origin':
              setValue(`flightDetails.${index}.cityFrom`,newValue.name) 
              setValue(`flightDetails.${index}.flyFrom`,newValue.iata)
              if(index===0){
                setValue(`origin`,newValue) 
              } 
            break;
            case 'destination':
              setValue(`flightDetails.${index}.cityTo`,newValue.name) 
              setValue(`flightDetails.${index}.flyTo`,newValue.iata)
              if(index===getValues("flightDetails").length-1){
                setValue(`destination`,newValue) 
              } 
            break;
          default:
            break;
        }
            setAirportsData([])
        }else return;
        }
    


  return (
    <>
    <Box justifyContent={"center"} gap={3} display="flex"  >

<FormControl fullWidth >
    <ToolTip title={t("departionTooltip")} right='-5%' top='-20%'>
     <Autocomplete defaultValue={{code:getValues(`flightDetails.${index}.flyFrom`),name:getValues(`flightDetails.${index}.cityFrom`)}} filterOptions={(x)=>x}  isOptionEqualToValue={(option,value)=>option.code===value.code} onChange={(e,value)=>{changeHandler('origin',value)}}   options={airportsData??[]} getOptionLabel={(option)=>option.code} renderOption={(props, option) => 
        {
        return(
        <Box component="li"  {...props}>
          <option value={option.code}>
          {option.name}
          </option>
          
        </Box>
      )}
    }  renderInput={(params)=><TextField   onChange={autoCompleteHandler}   label={t("origin")} {...params}  />} /> 
   </ToolTip>
   {formState.errors?.flightDetails&& <FormHelperText sx={{color:'red'}}>{formState.errors.flightDetails.message}</FormHelperText>}
</FormControl>
<FormControl fullWidth>
<ToolTip title={t("arrivalTooltip")} right='-5%' top='-20%'>
 <Autocomplete defaultValue={{code:getValues(`flightDetails.${index}.flyTo`),name:getValues(`flightDetails.${index}.cityTo`)}} filterOptions={(x)=>x} isOptionEqualToValue={(option,value)=>option.code===value.code} onChange={(e,value)=>{changeHandler('destination',value)}}   options={airportsData??[]} getOptionLabel={(option)=>option.code} renderOption={(props, option) => 
        {
        return(
        <Box component="li"  {...props}>
          <option value={option.code}>
          {option.name}
          </option>
          
        </Box>
      )}
    }  renderInput={(params)=><TextField  onChange={autoCompleteHandler}   label={t("destination")} {...params}  />} /> 
</ToolTip>
{formState.errors?.flightDetails&& <FormHelperText sx={{color:'red'}}>{formState.errors.flightDetails.message}</FormHelperText>}
</FormControl>

</Box>
 <Box justifyContent={"center"} gap={3} display="flex"  >
<FormControl fullWidth>
    <DateTimeInput name={`flightDetails.${index}.local_departure`} value={new Date(getValues(`flightDetails.${index}.local_departure`))}  control={control} label={t("departure")} />
</FormControl>
<FormControl fullWidth>
<DateTimeInput name={`flightDetails.${index}.local_arrival`} value={new Date(getValues(`flightDetails.${index}.local_arrival`))}   control={control} label={t("arrival")} />
</FormControl>
</Box> 

<Box justifyContent={"center"} gap={3} display="flex"   >
<FormControl fullWidth>
<Autocomplete defaultValue={{iata:getValues(`airline.${index}`)??"",name:allAirlines?allAirlines.find((airline)=>airline.iata==getValues(`airline.${index}`)):""}} onChange={(e,value)=>{changeHandler('airline',value)}} isOptionEqualToValue={(option,value)=>option.iata===value.iata}  getOptionLabel={(option:{name:string,iata:string,country:string})=> option.name+" "+ option.iata} options={allAirlines??[]} renderInput={(params)=><TextField   label={t("airline")} {...params}  />} renderOption={(props, option) => 
        {
        return(
        <Box key={option.name}    component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }}  {...props}>
           <Image
        loading="lazy"
        width="60"
        height={'30'}
       src={`https://daisycon.io/images/airline/?width=60&height=30&color=ffffff&iata=${option.iata}`}
        
        alt=""
      /> 
          <option  value={option.iata}>
          
          {option.name}
          </option>
          
        </Box>
      )}} />
      {formState.errors.flightDetails&& <FormHelperText sx={{color:'red'}}>{formState.errors.flightDetails.message}</FormHelperText>}
</FormControl>
<FormControl fullWidth>
<TextField label={t("flightNum")} {...register(`flightNumber.${index}`,{required:t("errors.flightNumReq")})} />
</FormControl>


</Box>
<Divider/>
</>
  )
}

export default SingleFlightEditForm