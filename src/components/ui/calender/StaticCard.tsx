import AddStopModal from '@/components/form/AddStopModal'
import { UserContext } from '@/context/auth-context'
import { IPlace } from '@/dummyData'
import axios from 'axios'
import { useRouter } from 'next/router'



import React, { useContext, useState,useEffect, useCallback } from 'react'

import DayItemCard from './DayItemCard'
import styles from './StaticCard.module.css'

type Props = {
item:IPlace|undefined,
date:string,
children:string,
position:string,
type:string,
lastLocation?:IPlace|undefined,
index:number
}


const StaticCard = (props: Props) => {
 const userCtx= useContext(UserContext)
    const [selectedPlace,setSelectedPlace]=useState<IPlace|undefined>(props.item)

    const [open,setOpen]=useState(false)
    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);
    const router=useRouter()
    const {planId}=router.query
const plan=userCtx?.plans.find((plan)=>plan._id==planId)



    useEffect(() => {
     if(userCtx){
      //setSelectedPlace(plan.days[props.index][props.position])
     }   

    }, [userCtx,props])
    

const handleOpen=()=>{
setOpen(true)
}


const handleSubmit=async(selected:IPlace)=>{
  console.log(selected);
  if(userCtx&&selected._id){
    try {
      const {data}=await axios.patch('/api/plan/days',{planId,index:props.index,listItem:selected,position:props.position})
      if(data.success){
       plan.days[props.index][props.position]=data.plan.days[props.index][props.position]
        setSelectedPlace(data.plan.days[props.index][props.position])
      }
    } catch (error) {
      throw new Error('Bad Request')
    }
 
  } 
      setOpen(false)
forceUpdate()
      }

    const  removeFromDayHandler=async(id:string)=>{

      try {
        const {data}= await axios.delete('/api/plan/days',{params:{index:props.index,planId:planId,placeId:id,position:props.position}})
       if(data.success){
        if(userCtx){
          plan.days[props.index][props.position]=undefined;
          setSelectedPlace(undefined) 
        }  
}
} catch (error) {
  throw new Error('bad request')
}
      forceUpdate()
      }

const handleClose=()=>{
    setOpen(false)
    }
   
    
    
  return (
  <>
<AddStopModal open={open} likedList={plan.liked[props.type]} onClose={handleClose} onSubmit={handleSubmit}/>
{ selectedPlace? <div style={{width:'100%'}}> <DayItemCard forceUpdate={forceUpdate}  index={props.index} static={true}  withDiractions={props?.lastLocation??null} btnText='Remove From Day' listItem={selectedPlace} onClick={removeFromDayHandler} /> </div>: <div onClick={handleOpen} className={styles.addBtn}> {props.children}</div> }
  </>
    
  )
}

export default StaticCard