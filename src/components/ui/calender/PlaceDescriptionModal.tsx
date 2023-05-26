
import { IPlace } from '@/dummyData'
import { Button, Card, CardContent,CircularProgress,Dialog, DialogActions, DialogContent, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'


import React, { useCallback, useContext,  useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { RoutineItem } from './DayList'
import PlaceItemDetailCard from './PlaceItemDetailCard'
import { PlanContext } from '@/context/plan-context'
import { Pin } from '@/components/svgComponents'


type Props = {open:boolean,close:()=>void,place:IPlace,static?:boolean,index?:number,listItem?:RoutineItem,}

const PlaceDescriptionModal = (props: Props) => {
  const [, updateState] = useState<any>();
 const  [isLoading,setIsLoading]=useState(false)
const forceUpdate = useCallback(() => updateState({}), []);

  const planCtx=useContext(PlanContext)
        const {register,handleSubmit,formState}=useForm({defaultValues:{budget:props.listItem?.budget,dayType:props.listItem?.position,description:props.listItem?.description}});




const updatePlace=async(formData:FieldValues)=>{


try {
  setIsLoading(true)
  const {data}=await axios.patch('/api/place/editPlace',
  {
    position:formData.dayType
    ,planId:planCtx?.plan._id,
    index:props.index,
    place:props.place,
    budget:formData.budget,
    dragId:props.listItem?.dragId,
    description:formData.description
  })
  if(data.success){
   const placeIndex=planCtx?.plan.days[Number(props.index)].rutine.findIndex((rutineItem:RoutineItem)=>rutineItem.place._id===props.place._id)
   props.close()
   setIsLoading(false)
   forceUpdate()
   if(!placeIndex)return;
  if(!props.listItem)return;
  const dataItem:RoutineItem={dragId:props.listItem?.dragId,place:props.listItem?.place,budget:formData.budget,position:formData.dayType}
   planCtx?.plan.days[Number(props.index)].rutine.splice(placeIndex,1,dataItem)
  }

   
} catch (error) {
  throw new Error('bad request')
}



}

  return (
    <Dialog  onClose={props.close} open={props.open} >
        <DialogContent>
          {props.place.location_id?
    <PlaceItemDetailCard place={props.place}/>
    : 
    <Card sx={{backgroundColor:"peachpuff"}}>
      
       <CardContent sx={{width:'100%'}}  >
    <Box  sx={{cursor:'pointer'}} display={"flex"} justifyContent="space-between">
    <Typography  fontSize={'1.3rem'} fontWeight={'bold'}>{props.place.name} </Typography>
    </Box>
{props.place?.address && (<Typography gutterBottom variant='subtitle2' color="InfoText">
<Pin width={12} height={10}  /> {props.place.address}
</Typography>)}
{props.place?.description&&
<Typography gutterBottom fontFamily={"cursive"}> {props.place.description} </Typography>}
  </CardContent></Card> }
        </DialogContent>
{!props.static && <DialogActions >

    <form style={{width:'100%'}} onSubmit={handleSubmit(updatePlace)}>
        <Box  display="flex" flexDirection="column" justifyContent='center' alignItems={"center"} gap={2}   >

        <FormControl sx={{width:'50%'}} >
            <TextField multiline minRows={2}  defaultValue={props.listItem?.description} {...register('description',{maxLength:{value:250,message:'250 max characters'}})}  label="Description" />
       {formState?.errors?.description?.message&&<FormHelperText>{formState.errors.description.message}</FormHelperText>}
        </FormControl>
        
        <FormControl sx={{width:'50%'}} >
            <TextField   defaultValue={props.listItem?.budget} {...register('budget',{valueAsNumber:true,min:0})} type="number" label="Budget" />
        </FormControl>
        <FormControl sx={{width:'50%'}} >
        <InputLabel id="lunch">Set as</InputLabel>
        <Select {...register('dayType')} defaultValue={props.listItem?.position}   label="Set as" labelId="lunch"   >
       
        <MenuItem defaultChecked={true} value={0}>none</MenuItem>
        <MenuItem value='mainAttraction'>Main Attraction</MenuItem>
        <MenuItem value='breakfest'>Breakfest</MenuItem>
        <MenuItem value='lunch'>Lunch</MenuItem>
        <MenuItem value='dinner'>Dinner</MenuItem>

            </Select>  
        </FormControl>
       {isLoading? <CircularProgress/> :<Button sx={{width:'50%'}} type='submit'>change</Button>}
        </Box>
    </form>
  
    
</DialogActions>}
    </Dialog>
  )
}

export default PlaceDescriptionModal