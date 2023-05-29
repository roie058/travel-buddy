
import { AlertColor, Box, Button, Card, CircularProgress,  FormControl,  TextField, Typography } from '@mui/material'
import { Autocomplete } from '@react-google-maps/api'
import axios from 'axios'

import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import AttracrionList from './AttracrionList'
import { IPlace } from '@/dummyData'
import { SearchIcon } from '../svgComponents'

export const  searchFn=async(query:string,url)=>{
  const options = {
    method: 'GET',
    url: url,
    params: {
      query: query,
      lang: 'en_US',
      units: 'km'
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_KEY,
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };
  
  try {

    const response = await axios.request(options);
   
  const results = response.data.data.map((responseItem)=>{return responseItem.result_object})
   return results
  } catch (error) {
    console.error(error);
  }

}


type Props = {likedList:IPlace[],setList: React.Dispatch<React.SetStateAction<IPlace[]>>}

const AttractionSearch = (props: Props) => {
  const [resultList,setResultList]=useState<any[]>()
  const [isLoading,setIsLoading]=useState<boolean>(false)
const {handleSubmit,register}=useForm()


const searchHandler:SubmitHandler<FieldValues>= async (data)=>{
  setIsLoading(true)
 const results=await searchFn(data.search,'https://travel-advisor.p.rapidapi.com/locations/auto-complete')
 if(results){
   setResultList(results.filter((v,i,a)=>a.findIndex(v2=>(v2.location_id===v.location_id))===i))
 }
  setIsLoading(false)
}



  return (
    <Card  >
<Box  padding={'5%'}  >

<Typography fontSize={"3rem"} variant='h1'>Search Places</Typography>
<form onSubmit={ handleSubmit(searchHandler)} style={{width:'100%'}}  >
<Box display={'flex'}>
<FormControl fullWidth>
<Autocomplete>
  <TextField fullWidth {...register('search',{required:'Search term is required'})} placeholder='Search Attractions'/>
</Autocomplete>
</FormControl>
  
{isLoading? <CircularProgress/> :<Button sx={{textTransform:'capitalize',borderRadius:'10px',marginLeft:'15px'}} type='submit'><SearchIcon /></Button>}

</Box>

</form>
{resultList? <AttracrionList setList={props.setList} likedList={new Set(props.likedList.map((place)=>place.location_id))} list={resultList}/>:null}
    </Box>
    </Card>
  )
}

export default AttractionSearch