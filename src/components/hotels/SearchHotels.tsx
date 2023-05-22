
import { Box, Button, Card, CircularProgress,  FormControl,  TextField, Typography } from '@mui/material'
import { Autocomplete } from '@react-google-maps/api'
import axios from 'axios'

import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { IPlace } from '@/dummyData'
import { SearchIcon } from '../svgComponents'
import HotelsSearchList from './HotelsSearchList'


type Props = {likedList:IPlace[]}

const SearchHotels = (props: Props) => {
  const [resultList,setResultList]=useState<any[]>()
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const [autocomplete,setAutocomplete]=useState<google.maps.places.Autocomplete|null>(null)
const {handleSubmit,register,setValue}=useForm({defaultValues:{location:{lat:undefined,lng:undefined},search:''}})

const searchHandler:SubmitHandler<FieldValues>= async (data)=>{
console.log(data);

  const options = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/hotels/list-by-latlng',
    params: {
      latitude: data.location.lat,
      longitude: data.location.lng,
      lang: 'en_US',
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_KEY,
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };
  
  try {
    setIsLoading(true)
     const response = await axios.request(options);
   const results = response.data.data
    console.log(results);
    setResultList(results)
  } catch (error) {
    console.error(error);
  }
  setIsLoading(false)
}



const onLoad=(autoC: google.maps.places.Autocomplete)=>{ setAutocomplete(autoC)}

const onPlaceChanged=()=>{
const lat=autocomplete?.getPlace().geometry?.location?.lat()
const lng=autocomplete?.getPlace().geometry?.location?.lng()
console.log(autocomplete.getPlace().name);

setValue('location',{lat:lat,lng:lng})


}



  return (
    <Card  >
<Box  padding={'5%'}  >


<form onSubmit={ handleSubmit(searchHandler)} style={{width:'100%'}}  >
<Box display={'flex'}>
<FormControl fullWidth>
<Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad} >
  <TextField fullWidth {...register('search',{required:'Search term is required'})} placeholder='Search Hotels'/>
</Autocomplete>
</FormControl>
  
{isLoading? <CircularProgress/> :<Button sx={{textTransform:'capitalize',borderRadius:'10px',marginLeft:'15px'}} type='submit'><SearchIcon /></Button>}



</Box>



</form>
{resultList? <HotelsSearchList likedList={new Set(props.likedList.map((place)=>place.location_id))} list={resultList}/>:null}
    </Box>
    </Card>
  )
}

export default SearchHotels