
import { IPlace } from '@/dummyData'


import React from 'react'
import AddToPlanModal from './AddToPlanModal'
import { AlertColor } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { newLikedPlace, removePlace } from '@/util/fetchers'
import { Plan } from '@/components/pageCompnents/Schedule'
import { queryClient } from '@/pages/_app'
import { useTranslation } from 'react-i18next'

type Props = {setSnackBar: (message: string, severity: AlertColor) => void,open:boolean,onClose:()=>void,clickedLocation:IPlace,type:"restaurants" | "hotels" | "attractions",likeHandler:()=>void}

const LikeModal = (props: Props) => {
  const {t}=useTranslation("map")
const {data:plans}:{data:Plan[]}=useQuery({queryKey:["plans",{populate:true}]})
const {mutate:remove,isLoading:removeLoading}=useMutation({mutationFn: removePlace,onSuccess:()=>{
  props.setSnackBar(t("snack.placeRemoved"),"error")
queryClient.invalidateQueries(["plans",{populate:true}])
},
onError:()=>{
  props.setSnackBar(t("snack.serverError"),"error")
  queryClient.invalidateQueries(["plans",{populate:true}])
}})
const {mutate:addPlace,isLoading}=useMutation({mutationFn: newLikedPlace,onSuccess:()=>{
  props.setSnackBar(t("snack.addedPlace"),'success')
  queryClient.invalidateQueries(["plans",{populate:true}])
  props.likeHandler()
},
onError:()=>{
  props.setSnackBar(t("snack.serverError"),"error")
  queryClient.invalidateQueries(["plans",{populate:true}])
}})

const submitHandler=async (index:number,)=>{

const isLiked=plans[index].liked[`${props.clickedLocation?.category?.key??'hotel'}s`].find((place:IPlace)=>props.clickedLocation.location_id===place.location_id)
if(isLiked){
  remove({place:props.clickedLocation,planId:plans[index]._id,category:`${props.clickedLocation?.category?.key??'hotel'}s`})
}else{
  addPlace({place:props.clickedLocation,planId:plans[index]._id,category:`${props.clickedLocation?.category?.key??'hotel'}s`})
}

}


  return (
    <>
    {plans&& <AddToPlanModal plans={plans} open={props.open} type={props.type} isLoading={removeLoading||isLoading} submitHandler={submitHandler} clickedLocation={props.clickedLocation} onClose={props.onClose} />}
    </>
  )
}

export default LikeModal