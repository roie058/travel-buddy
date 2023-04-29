
import { IPlace } from '@/dummyData'
import { Button, Card, CardContent,Dialog, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import Image from 'next/image'

import React, { useCallback, useContext,  useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { RoutineItem } from './DayList'
import PlaceItemDetailCard from './PlaceItemDetailCard'
import { PlanContext } from '@/context/plan-context'


type Props = {open:boolean,close:()=>void,place:IPlace,static?:boolean,index?:number,listItem?:RoutineItem,}

const PlaceDescriptionModal = (props: Props) => {
  const [, updateState] = useState<any>();
const forceUpdate = useCallback(() => updateState({}), []);

  const planCtx=useContext(PlanContext)
 

        const {register,handleSubmit}=useForm({defaultValues:{budget:props.listItem?.budget,dayType:props.listItem?.position}});




const updatePlace=async(formData:FieldValues)=>{


try {
  const {data}=await axios.patch('/api/place/editPlace',
  {
    position:formData.dayType
    ,planId:planCtx?.plan._id,
    index:props.index,
    place:props.place,
    budget:formData.budget,
    dragId:props.listItem?.dragId,
  })
  if(data.success){
   const placeIndex=planCtx?.plan.days[Number(props.index)].rutine.findIndex((rutineItem:RoutineItem)=>rutineItem.place._id===props.place._id)
  if(!placeIndex)return;
  if(!props.listItem)return;
  const dataItem:RoutineItem={dragId:props.listItem?.dragId,place:props.listItem?.place,budget:formData.budget,position:formData.dayType}
   planCtx?.plan.days[Number(props.index)].rutine.splice(placeIndex,1,dataItem)
forceUpdate()
   props.close()
  }
} catch (error) {
  throw new Error('bad request')
}
console.log(`to ${formData.dayType}`);



}

  return (
    <Dialog  onClose={props.close} open={props.open} >
        <DialogContent>
          {props.place.location_id?
    <PlaceItemDetailCard place={props.place}/>
    : 
    <Card sx={{backgroundImage:'url(/images/paper.jpg)'}}>
      
       <CardContent sx={{width:'100%'}}  >
    <Box  sx={{cursor:'pointer'}} display={"flex"} justifyContent="space-between">
    <Typography  fontSize={'1.3rem'} fontWeight={'bold'}>{props.place.name} </Typography>
    </Box>
{props.place?.address && (<Typography gutterBottom variant='subtitle2' color="InfoText">
<Image alt='' width={12} height={10}  src={'/images/pin.svg'}/> {props.place.address}
</Typography>)}
{props.place?.description&&
<Typography gutterBottom fontFamily={"cursive"}> {props.place.description} </Typography>}
  </CardContent></Card> }
        </DialogContent>
{!props.static && <DialogActions >

    <form style={{width:'100%'}} onSubmit={handleSubmit(updatePlace)}>
        <Box  display="flex" flexDirection="column" justifyContent='center' alignItems={"center"} gap={2}   >

        
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
        <Button sx={{width:'50%'}} type='submit'>change</Button>
        </Box>
    </form>
  
    
</DialogActions>}
    </Dialog>
  )
}

export default PlaceDescriptionModal