import { UserContext } from '@/context/auth-context'
import { IPlace } from '@/dummyData'
import axios from 'axios'

import React, { useContext, useState } from 'react'
import AddToPlanModal from './AddToPlanModal'

type Props = {open:boolean,onClose:()=>void,clickedLocation:IPlace,type:string,likeHandler:()=>void}

const LikeModal = (props: Props) => {
const userCtx = useContext(UserContext)
const [isLoading, setIsLoading] = useState(false)

const submitHandler=async (index:number,)=>{
const isLiked=userCtx?.plans[index].liked[`${props.clickedLocation?.category?.key??'hotel'}s`].find((place:IPlace)=>props.clickedLocation.location_id===place.location_id)
if(isLiked){
  try {
    setIsLoading(true)
    const {data} = await axios.patch('/api/place/newPlace',{place:props.clickedLocation,category:`${props.clickedLocation?.category?.key??'hotel'}s`,planId:userCtx?.plans[index]._id})
    if(data.success){
      const dataI=userCtx?.plans[index].liked[`${props.clickedLocation?.category?.key??'hotel'}s`].findIndex((place:IPlace)=>place.location_id==props.clickedLocation.location_id)
      userCtx?.plans[index].liked[props.type].splice(dataI,1)
    }else{
      console.log(data.error);
      
    }
    
  } catch (error) {
    console.log(error);
  }
}else{
try {
  setIsLoading(true)
  
  const {data} = await axios.post('/api/place/newPlace',{place:props.clickedLocation,category:`${props.clickedLocation?.category?.key??'hotel'}s`,planId:userCtx?.plans[index]._id})
  console.log(data);
  
} catch (error) {
    console.log(error);
    
  }

  userCtx?.plans[index].liked[props.type].push(props.clickedLocation)
 
  props.likeHandler()
}
setIsLoading(false)
}


  return (
    <>
    {userCtx&& userCtx.plans&& <AddToPlanModal plans={userCtx?.plans} open={props.open} type={props.type} isLoading={isLoading} submitHandler={submitHandler} clickedLocation={props.clickedLocation} onClose={props.onClose} />}
    </>
  )
}

export default LikeModal