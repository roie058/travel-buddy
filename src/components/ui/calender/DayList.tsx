
import styles from './DayList.module.css'
import React,{useContext, useState,useEffect, useCallback} from 'react'
import DayItemCard from './DayItemCard'
import{ Draggable, Droppable, resetServerContext } from 'react-beautiful-dnd'

import AddStopModal from '@/components/form/AddStopModal'

import UserAddedNote from './UserAddedNote'
import { IPlace} from '@/dummyData'

import { ListItems } from '../list/List'
import axios from 'axios'

import { Flight } from '@/components/flights/AddFlightModal'
import FlightCard from '@/components/flights/FlightCard'
import { PlanContext } from '@/context/plan-context'
type Props = {
list:Array<RoutineItem>|any[],
position:string
date:number,
flights?:Flight[],
lastLocation?:ListItems|undefined
}

export type RoutineItem={place:IPlace,dragId:string,budget:number,position?:string}

const DayList = (props: Props) => {

    resetServerContext()
const [list, setList] = useState<Array<RoutineItem>>([])
const [open, setOpen] = useState(false)
const planCtx=useContext(PlanContext)
const [, updateState] = useState<any>();
const forceUpdate = useCallback(() => updateState({}), []);
const plan=planCtx?.plan

useEffect(() => {
  setList(props.list)
}, [props])


const clickHandler=async(id:string)=>{
 const filteredList=list.filter((item)=> item.dragId !== id)
 const item=list.find((item)=>item.dragId===id)
try {
 const {data}= await axios.delete('/api/plan/days',{params:{dragId:id,index:props.date,planId:planCtx?.plan._id,placeId:item?.place._id}})
if(data.success){
  setList((list)=> filteredList)
  if(planCtx&&plan){
      plan.days[props.date][props.position]=filteredList
  }
}
} catch (error) {
  throw new Error('bad request')
}

forceUpdate()
}

 

const handleOpenAdd:React.MouseEventHandler=(e)=>{
e.preventDefault()
setOpen(true)
}



const handleSubmit=async (selected:IPlace )=>{
  if(selected?._id){  
    const newIdListItem:RoutineItem={place:selected,budget:0,dragId:selected._id+Math.random()}
    try {
      const {data}=await axios.patch('/api/plan/days',{listItem:newIdListItem,index:props.date,planId:plan?._id})
      if(data.success){
        console.log(data.plan);
      }
    } catch (error) {
      throw new Error('Bad Request')
    }
 
     setList((list)=>(  [...list,newIdListItem] ))
     if(planCtx&&plan){
        plan.days[props.date].rutine=[...list,newIdListItem]
     }

  }
    setOpen(false)
    forceUpdate()
  
  }
       

const handleClose=()=>{
      setOpen(false)
    }


  return (
    <>
   {plan&&<AddStopModal  likedList={plan.liked.attractions.concat(plan.liked.restaurants)} open={open} onSubmit={handleSubmit} onClose={handleClose}/>}
   
    <Droppable  droppableId={props.date+'/'+props.position}  >
        {(provided)=>(
        <div className={styles.daylist} {...provided.droppableProps}  ref={provided.innerRef} >
        { list.map((listItem,index)=>{
        return  !listItem.place.location_id ?
         <Draggable  key={listItem.dragId} draggableId={listItem.dragId} index={index} >
                {(provided)=>(
                    <div id={listItem.dragId} {...provided.draggableProps} {...provided.dragHandleProps}  ref={provided.innerRef}>
                     <UserAddedNote forceUpdate={forceUpdate} position={listItem?.position}  index={props.date}  onClick={clickHandler} withDiractions btnText='Remove From Day'  listItem={listItem}/>
                    </div>
                    )}
            </Draggable>
            :
            <Draggable  key={listItem.dragId} draggableId={listItem.dragId} index={index} >
            {(provided)=>(
                <div id={listItem.dragId} {...provided.draggableProps} {...provided.dragHandleProps}  ref={provided.innerRef}>
                 <DayItemCard forceUpdate={forceUpdate} position={listItem?.position}  index={props.date}  onClick={clickHandler}  btnText='Remove From Day'  listItem={listItem}/>
                </div>
                )}
        </Draggable>
 } )}
 {props.flights&& props.flights?.length>0&&props.flights.map((flight)=><FlightCard key={flight._id} flight={flight}/>)}
{list.length>0&&(list.length<10  ? <div onClick={handleOpenAdd} className={styles.newBtn}>+Add next stop</div>:<div  className={styles.newBtn}>Max 10 stops per day</div>)}
{list.length<=0 && <div onClick={handleOpenAdd} className={styles.firstNewBtn}>+Add next stop</div>}

{provided.placeholder}
</div>
)}
</Droppable>

</>
  )
}

export default DayList