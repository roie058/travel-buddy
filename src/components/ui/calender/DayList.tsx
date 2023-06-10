
import styles from './DayList.module.css'
import React,{ useState,useEffect} from 'react'
import DayItemCard from './DayItemCard'
import{ Draggable, Droppable, resetServerContext } from 'react-beautiful-dnd'

import AddStopModal from '@/components/form/AddStopModal'

import UserAddedNote, { UserAddedItem } from './UserAddedNote'
import { IPlace} from '@/dummyData'

import { ListItems } from '../list/List'


import { Flight } from '@/components/flights/AddFlightModal'
import FlightCard from '@/components/flights/FlightCard'
import { Box } from '@mui/material'
import useSnackBar from '@/hooks/useSnackBar'
import SnackBar from '../SnackBar'
import { useTranslation } from 'next-i18next'
import {useMutation} from '@tanstack/react-query'
import { listAdd, listRemove } from '@/util/fetchers'
import { queryClient } from '@/pages/_app'
import { Plan } from '@/components/pageCompnents/Schedule'

type Props = {
list:Array<RoutineItem>|any[],
position:'mainAttraction'|'breakfest'|'lunch'|'dinner'|'rutine'
date:number,
flights?:Flight[],
lastLocation?:ListItems|undefined
plan:Plan
}

export type RoutineItem={description?:string,place:IPlace,dragId:string,budget:number,position?:'mainAttraction'|'breakfest'|'lunch'|'dinner',_id?:string}

const DayList = (props: Props) => {

    resetServerContext()
    const {t}=useTranslation("day")
const [list, setList] = useState<Array<RoutineItem>>([])
const [open, setOpen] = useState(false)
const {setSnackBar,snackBarProps}=useSnackBar()


//removeItem
const {mutate:removeItem}=useMutation(listRemove,{onMutate:({dragId})=>{
   const filteredList=list.filter((item)=> item.dragId !== dragId)
   setList((list)=> filteredList)
  },onSuccess:()=>{
  setSnackBar(t("snack.removeItem"),"error")
},onError:(e,v)=>{
  queryClient.invalidateQueries(["plan",v.planId])
setSnackBar(t("snack.error"),"error")

}})

//add item
const {mutate:addItem}=useMutation(listAdd,{onMutate:(({listItem})=>{
  setList((list)=>(  [...list,listItem] ))
}),onSuccess:(data,v)=>{
  setOpen(false)
  setSnackBar(t("snack.newStop"),'success')
  queryClient.invalidateQueries(["plan",v.planId])
},onError:(error,v)=>{
  queryClient.invalidateQueries(["plan",v.planId])
  setSnackBar(t("snack.error"),"error")
}})

useEffect(() => {
  setList(props.list)
}, [props.list])







const clickHandler=async(id:string)=>{
 const item=list.find((item)=>item.dragId===id)
 removeItem({dragId:id,index:props.date,planId:String(props.plan._id),placeId:item?.place._id})
}


const handleOpenAdd:React.MouseEventHandler=(e)=>{
e.preventDefault()
setOpen(true)
}



const handleSubmit=async (selected:IPlace|UserAddedItem )=>{
  function isPlace(selected: IPlace|UserAddedItem): selected is IPlace {
    return (selected as IPlace)._id !== undefined;
  }
   if(isPlace(selected)){  
   if(!selected._id)return;
     const newIdListItem:RoutineItem={place:selected,budget:0,dragId:selected._id+Math.random()}
     addItem({listItem:newIdListItem,index:props.date,planId:String(props.plan._id)})
  }
}
       

const handleClose=()=>{
      setOpen(false)
    }


  return (
    <>
   {props.plan&&<AddStopModal  likedList={props.plan.liked.attractions.concat(props.plan.liked.restaurants)} open={open} onSubmit={handleSubmit} onClose={handleClose}/>}
   
    <Droppable  droppableId={props.date+'/'+props.position}  >
        {(provided)=>(
        <Box  className={styles.daylist} sx={{overflowY:list.length>3?'scroll':"auto"}}  {...provided.droppableProps}  ref={provided.innerRef} >
        { list.map((listItem,index)=>{
        return  !listItem?.place?.location_id ?
         <Draggable  key={listItem?.dragId} draggableId={listItem?.dragId} index={index} >
                {(provided)=>(
                    <div id={listItem?.dragId} {...provided.draggableProps} {...provided.dragHandleProps}  ref={provided.innerRef}>
                     <UserAddedNote  minify={list.length>4}  position={listItem?.position}  index={props.date}  onClick={clickHandler} withDiractions btnText='Remove From Day'  listItem={listItem}/>
                    </div>
                    )}
            </Draggable>
            :
            <Draggable  key={listItem.dragId} draggableId={listItem.dragId} index={index} >
            {(provided)=>(
                <div id={listItem.dragId} {...provided.draggableProps} {...provided.dragHandleProps}  ref={provided.innerRef}>
                 <DayItemCard  minify={list.length>4}  position={listItem?.position}  index={props.date}  onClick={clickHandler}  btnText='Remove From Day'  listItem={listItem}/>
                </div>
                )}
        </Draggable>
 } )}
 {props.flights&& props.flights?.length>0&&props.flights.map((flight)=><FlightCard key={flight._id} flight={flight}/>)}
{list.length>0&&(list.length<10  ? <div onClick={handleOpenAdd} className={styles.newBtn}>+{t("nextStop")}</div>:<div  className={styles.newBtn}>Max 10 stops per day</div>)}
{list.length<=0 && <div onClick={handleOpenAdd} className={styles.firstNewBtn}>+{t("nextStop")}</div>}

{provided.placeholder}
</Box>
)}
</Droppable>
<SnackBar {...snackBarProps}/>
</>
  )
}

export default DayList