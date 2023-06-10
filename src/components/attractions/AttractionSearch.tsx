
import { AlertColor, Box, Button, Card, CircularProgress,  FormControl,  TextField, Typography } from '@mui/material'
import { Autocomplete } from '@react-google-maps/api'
import axios from 'axios'

import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import AttracrionList from './AttracrionList'
import { IPlace } from '@/dummyData'
import { SearchIcon } from '../svgComponents'
import { useTranslation } from 'next-i18next'
import { useQuery } from '@tanstack/react-query'

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

  const [search,setSearch]=useState<string>()
const {handleSubmit,register}=useForm()
const {t}=useTranslation("allLiked")

const {data:resultList,isFetching:isLoading}=useQuery(['searchAttr',search],()=>searchFn(search,'https://travel-advisor.p.rapidapi.com/locations/auto-complete').then((value)=>value.filter((v,i,a)=>a.findIndex(v2=>(v2.location_id===v.location_id))===i)),{enabled:!!search,})

const searchHandler:SubmitHandler<FieldValues>= async (data)=>{
  setSearch(data.search)
}

  return (
    <Card  >
<Box  padding={'5%'}  >

<Typography fontSize={"3rem"} variant='h1'>{t('searchHeader')}</Typography>
<form onSubmit={ handleSubmit(searchHandler)} style={{width:'100%'}}  >
<Box display={'flex'}>
<FormControl fullWidth>
<Autocomplete>
  <TextField fullWidth {...register('search',{required:t("searchReq")})} placeholder={t('searchHeader')}/>
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