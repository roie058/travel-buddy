import { IPlace } from '@/dummyData';
import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, FormControl, FormHelperText,TextField, Typography } from '@mui/material';
import { Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { UserAddedItem } from '../ui/calender/UserAddedNote';


type Props = {
  onSubmit:(value:IPlace|UserAddedItem)=>void
}

const UserAddedNoteForm = (props: Props) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [autocomplete,setAutocomplete]=useState<google.maps.places.Autocomplete|null>(null)

const {register,handleSubmit,setValue,formState,setError}=useForm()
    const handleChange =
      () => {
        setExpanded(!expanded);
      };


      const onLoad=(autoC: google.maps.places.Autocomplete)=>{ setAutocomplete(autoC)}

      const onPlaceChanged=()=>{
    const lat=autocomplete?.getPlace().geometry?.location?.lat()
    const lng=autocomplete?.getPlace().geometry?.location?.lng()
    setValue('latitude',lat)
    setValue('longitude',lng)

      }


      const submitHandler=async(data:FieldValues)=>{
if(data.latitude&&data.longitude){
  try {
    setIsLoading(true)
    const res =await axios.post('/api/place/newPlace',{place:data})
    if(res.data.success){
      props.onSubmit(res.data.newPlace)
      
    }
  } catch (error) {
    throw new Error('Bad request')
  }
  setIsLoading(false)
}else{
setError('address',{message:'please write a real address'})
}



      }
  
    return (
      <div>
        <Accordion expanded={expanded} onChange={handleChange}>
          <AccordionSummary
            
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Add Note
            </Typography>
            
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit((data)=>submitHandler(data))} style={{display:'flex',gap:'10px',flexDirection:'column' }}>
            <FormControl fullWidth >
                <TextField  {...register('name',{required:'Title is required'})}  label="Title" id='header'/>
                <FormHelperText sx={{color:'red'}}>{String(formState.errors.name?.message)}</FormHelperText>
            </FormControl>
            <FormControl fullWidth >
                <Autocomplete className='googleAuto' onLoad={onLoad} onPlaceChanged={onPlaceChanged}  >
                <TextField onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}  {...register('address',{required:'address is required'})} label="address"  id='address' name='address'/>
                </Autocomplete>
                <FormHelperText sx={{color:'red'}}>{String(formState.errors.address?.message)}</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
                
              <TextField  multiline {...register('description',{maxLength:{value:250,message:'body must be less then 250 characters'}})} label="Note body"  id='description' name='description'/>
              <FormHelperText>250 characters max</FormHelperText>
              <FormHelperText sx={{color:'red'}}>{String(formState.errors.description?.message)}</FormHelperText>
            </FormControl>

          { isLoading? <CircularProgress/> : <Button   type="submit">Add</Button>}
            </form>
          </AccordionDetails>
        </Accordion>
 
      </div>
    );
  }

export default UserAddedNoteForm