
import { IPlace } from '@/dummyData'
import { Button, Card, CardContent,CircularProgress,Dialog, DialogActions, DialogContent, Divider, FormControl, FormHelperText, Icon, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'


import React, { useCallback, useContext,  useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { RoutineItem } from './DayList'
import PlaceItemDetailCard from './PlaceItemDetailCard'
import { PlanContext } from '@/context/plan-context'
import { PaperPinIcon, Pin } from '@/components/svgComponents'
import ToolTip from '../ToolTip'


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
    <Dialog fullWidth onClose={props.close} open={props.open} >
        <DialogContent  >
          {props.place.location_id?
    <PlaceItemDetailCard place={props.place}/>
    : 
    <Card  sx={{height:'150px',paddingX:'0',backgroundColor:"#FFFDF2CC",borderRadius:0 ,fontFamily: "Heebo, sans-serif",display:'flex',alignItems:'center',position:'relative'}}>

        <Icon sx={{position:'absolute',top:0,left:0,width:30,height:30,padding:1,zIndex:3}}><PaperPinIcon width={30} height={30} /></Icon>
            <CardContent   sx={{zIndex:2,marginLeft: '25px',  height:'100%',padding:'5%', paddingBottom:'0 !important',borderLeft:'1px solid #B4050573',display:'flex',flexDirection:"column",justifyContent:'center'}}>
 
                <Typography variant='h4' textTransform={"capitalize"} fontSize={"1rem"} fontWeight="bold">{props.listItem.place.name} </Typography>
                <Typography variant="subtitle1" ><Pin height={10} width={10} /> {props.listItem.place.address}</Typography>  
                <Typography variant="subtitle1"  >- {props.listItem.place?.description}</Typography>  
            </CardContent>

              <Box position={"absolute"} zIndex={1} display={'flex'} height={"100%"} marginTop={'22px'} justifyContent={"space-evenly"} flexDirection={"column"} top={0} right={0} width={'100%'}> 
                <Divider></Divider>
                <Divider></Divider>
                <Divider></Divider>
                <Divider></Divider>
                <Divider></Divider>
                <Divider></Divider>
              </Box>
              </Card> }
        </DialogContent>
{!props.static && <DialogActions >

    <form style={{width:'100%'}} onSubmit={handleSubmit(updatePlace)}>
    <ToolTip title='add additional details about this place set it as a meal/main attraction add the expense budget or add a comment' top='-5%' right='3%'>
        <Box paddingX={'5%'} display="flex" flexDirection="column" justifyContent='center' alignItems={"center"} gap={2}   >

        <FormControl fullWidth >
         
            <TextField multiline minRows={2}  defaultValue={props.listItem?.description} {...register('description',{maxLength:{value:250,message:'250 max characters'}})}  label="Description" />
       {formState?.errors?.description?.message&&<FormHelperText>{formState.errors.description.message}</FormHelperText>}
       
        </FormControl>
    
        
        <FormControl fullWidth >
            <TextField   defaultValue={props.listItem?.budget} {...register('budget',{valueAsNumber:true,min:0})} type="number" label="Budget" />
        </FormControl>
        <FormControl fullWidth >
        <InputLabel id="lunch">Set as</InputLabel>
        
        <Select {...register('dayType')} defaultValue={props.listItem?.position}   label="Set as" labelId="lunch"   >
       
        <MenuItem defaultChecked={true} value={0}>none</MenuItem>
        <MenuItem value='mainAttraction'>Main Attraction</MenuItem>
        <MenuItem value='breakfest'>Breakfest</MenuItem>
        <MenuItem value='lunch'>Lunch</MenuItem>
        <MenuItem value='dinner'>Dinner</MenuItem>

            </Select>  
           
        </FormControl>
       {isLoading? <CircularProgress/> :<Button variant="contained" sx={{width:'50%'}} type='submit'>set</Button>}
        </Box>
        </ToolTip>
    </form>
  
    
</DialogActions>}
    </Dialog>
  )
}

export default PlaceDescriptionModal