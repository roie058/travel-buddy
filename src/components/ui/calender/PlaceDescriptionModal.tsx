
import { IPlace } from '@/dummyData'
import { Button, Card, CardContent,CircularProgress,Dialog, DialogActions, DialogContent, Divider, FormControl, FormHelperText, Icon, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { RoutineItem } from './DayList'
import PlaceItemDetailCard from './PlaceItemDetailCard'

import { PaperPinIcon, Pin } from '@/components/svgComponents'
import ToolTip from '../ToolTip'
import { useTranslation } from 'next-i18next'
import { useMutation } from '@tanstack/react-query'
import { editPlace } from '@/util/fetchers'
import { queryClient } from '@/pages/_app'
import { useRouter } from 'next/router'

type Props = {open:boolean,close:()=>void,place:IPlace,static?:boolean,index?:number,listItem?:RoutineItem,}

const PlaceDescriptionModal = (props: Props) => {
const {query}=useRouter()
const {t}=useTranslation("day")

const {register,handleSubmit,formState}=useForm({defaultValues:{budget:props.listItem?.budget,dayType:props.listItem?.position,description:props.listItem?.description}});

const {mutate,isLoading}=useMutation({mutationFn:editPlace,onSuccess:()=>{
  props.close()
  queryClient.invalidateQueries(["plan",query.planId])
},onError:()=>{

}})

const updatePlace=async(formData:FieldValues)=>{
  mutate({
    position:formData.dayType,
    planId:String(query.planId),
    index:props.index,
    place:props.place,
    budget:formData.budget,
    dragId:props.listItem?.dragId,
    description:formData.description})
}

  return (
    <Dialog fullWidth onClose={props.close} open={props.open} >
        <DialogContent  >
          {props.place?.location_id?
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
    <ToolTip title={t("placeTooltip")} top='-5%' right='3%'>
        <Box paddingX={'5%'} display="flex" flexDirection="column" justifyContent='center' alignItems={"center"} gap={2}   >

        <FormControl fullWidth >
         
            <TextField multiline minRows={2}  defaultValue={props.listItem?.description} {...register('description',{maxLength:{value:250,message:t("maxChar")}})}  label={t("description")} />
       {formState?.errors?.description?.message&&<FormHelperText>{formState.errors.description.message}</FormHelperText>}
       
        </FormControl>
    
        
        <FormControl fullWidth >
            <TextField   defaultValue={props.listItem?.budget} {...register('budget',{valueAsNumber:true,min:0})} type="number" label={t("budget")} />
        </FormControl>
        <FormControl fullWidth >
        <InputLabel id="lunch">{t("set")}</InputLabel>
        
        <Select {...register('dayType')} defaultValue={props.listItem?.position}   label="Set as" labelId="lunch"   >
       
        <MenuItem defaultChecked={true} value={0}>{t("none")}</MenuItem>
        <MenuItem value='mainAttraction'>{t("main")}</MenuItem>
        <MenuItem value='breakfest'>{t("breakfest")}</MenuItem>
        <MenuItem value='lunch'>{t("lunch")}</MenuItem>
        <MenuItem value='dinner'>{t("dinner")}</MenuItem>

            </Select>  
           
        </FormControl>
       {isLoading? <CircularProgress/> :<Button variant="contained" sx={{width:'50%'}} type='submit'>{t("setBtn")}</Button>}
        </Box>
        </ToolTip>
    </form>
  
    
</DialogActions>}
    </Dialog>
  )
}

export default PlaceDescriptionModal