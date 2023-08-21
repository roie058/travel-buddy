import { Flight } from '@/components/flights/AddFlightModal'
import Day from '@/components/ui/calender/Day'
import { RoutineItem } from '@/components/ui/calender/DayList'



import { IPlace } from '@/dummyData'
import { NewSesstion } from '@/pages/api/auth/signup'
import {  Box} from '@mui/material'
import  {LoadScriptNext}  from '@react-google-maps/api'


import { useSession } from 'next-auth/react'


import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd'
import {useQuery,useMutation} from '@tanstack/react-query'
import { getPlanById, listChange } from '@/util/fetchers'
type Props = {}



export type Days={
  date:string,
  rutine:Array<RoutineItem>
  start?:IPlace|undefined,
  breakfest?:IPlace|undefined,
  lunch?:IPlace|undefined,
  dinner?:IPlace|undefined,
  mainAttraction?:IPlace|undefined,
  end?:IPlace|undefined,
  budget:number,
  weather:{temp:string,rainProb:string,weatherType:string,icon:string}
  }
export type Expense={
  name:string,
  category:string,
  price:number,
  _id?:string
}
export type Hotel={
  place:IPlace,nightPrice:number,start:Date,end:Date,_id?:string
}

type DayObj=Array<Days>

export type Plan={
  _id:string,
image:string,
country:string,
header:string,
start:Date,
end:Date,
days:DayObj,
budget:{currency?:string,budget:number,transportation:Expense[],expenses:Expense[]}
tags:string[],
liked:{restaurants:Array<IPlace>,hotels:Array<IPlace>,attractions:Array<IPlace>},
flights:Flight[]
hotels:Hotel[]
}


const libraries:("geometry" | "drawing" | "places" | "localContext" | "visualization")[] =['geometry', 'drawing', 'places']

const Schedule = (props: Props) => {
  const router=useRouter()
  const {planId}=router.query
  const [list,setList ] =useState<Plan|undefined>()

  const {data:session}:{data:NewSesstion}=useSession()


const {data,refetch}=useQuery({queryKey:["plan",planId],queryFn:()=>getPlanById(session,String(planId)),enabled:!!session})
const {mutate}=useMutation({mutationFn:listChange,onSuccess:()=>{
  refetch()
}})
useEffect(()=>{
if(data){
  setList(data)
}
},[data])


  
 
const handleDragEnd:OnDragEndResponder=async(result)=>{
  if(!result.destination||!list) return
  
  const {source,destination}=result
  const {droppableId:srcDropId,index:srcIndex }=source
  const {index:dstIndex,droppableId:dstDropId}=destination


  
 const  dstArr=list.days[Number(dstDropId.split('/')[0])].rutine;
 const  srcArr=list.days[Number(srcDropId.split('/')[0])].rutine;
 
const item=srcArr[srcIndex]
if(dstDropId!==srcDropId){
  srcArr.splice(srcIndex,1)
  dstArr.splice(dstIndex,0,item)

if(item.position&& Number(item.position) !== 0 ){
  const dayIndex:number=Number(srcDropId.split('/')[0])
  const position:'mainAttraction'|'breakfest'|'lunch'|'dinner'=item.position
  list.days[dayIndex][position]=undefined
  item.position=undefined
}

}else{
srcArr.splice(srcIndex,1)
srcArr.splice(dstIndex,0,item)
}

mutate(list)

   }


  return (<>
   <LoadScriptNext  googleMapsApiKey={`${process.env.MAPS_API_KEY}`} libraries={libraries}> 
    {list&&  
     <main style={{alignContent:"flex-start",display:"block",padding:'0 5%'}}>
    
     <DragDropContext onDragEnd={handleDragEnd} >
     
        <Box sx={{justifyContent:'center'}} paddingTop={'2%'} display={'flex'} flexWrap={"wrap"}  >
        {list&& list.days.map((date:Days,i)=>{
       
      return  <Day key={i} plan={list}  index={i} day={date} />
        
        })}
        
        </Box>
        </DragDropContext>
        
        </main>
      }
         </LoadScriptNext> 
      </>
  )
}

export default Schedule