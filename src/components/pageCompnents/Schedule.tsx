import { Flight } from '@/components/flights/AddFlightModal'
import Day from '@/components/ui/calender/Day'
import { RoutineItem } from '@/components/ui/calender/DayList'


import { PlanContext } from '@/context/plan-context'
import { IPlace } from '@/dummyData'
import { NewSesstion } from '@/pages/api/auth/signup'
import {  Grid} from '@mui/material'

import axios, { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'


import { useRouter } from 'next/router'

import React, { useCallback, useEffect, useState } from 'react'
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd'

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
budget:{budget:number,transportation:Expense[],expenses:Expense[]}
tags:string[],
liked:{restaurants:Array<IPlace>,hotels:Array<IPlace>,attractions:Array<IPlace>},
flights:Flight[]
hotels:Hotel[]
}




const Schedule = (props: Props) => {
  const router=useRouter()
  const {planId}=router.query
  const [list,setList ] =useState<Plan|undefined>()
  const [, updateState] = useState<any>();
const forceUpdate = useCallback(() => updateState({}), []);
  const [isLoading,setIsLoading]=useState(false)
  const {data:session}=useSession()
const newSession:NewSesstion={...session}

  useEffect(() => {
    const getPlan=async ()=>{
     try {
       setIsLoading(true)
     const {data} =await axios.get('/api/plan/getPlan',{params:{userId:newSession.user?.id,planId:planId}})
     if(data.success){
       setList(data.plan)
       console.log(data.plan);
       
     }
     } catch (error) {
       if(error instanceof AxiosError){
         const errorMsg=error.response?.data?.error
         console.log(errorMsg);
       }
     }
   setIsLoading(false)
    }
    if(session){
      getPlan()
    }

   }, [session,planId])

  
 
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


try {
const {data} = await axios.patch('/api/plan/daysChange',{plan:list})
if(data.success){
  
}
} catch (error) {
  throw new Error('Bad Request')
}
setList((list)=> list )
  
  forceUpdate()
   
   }


  return (<>
    {list&&  <PlanContext.Provider value={{plan:list}}>
     <main style={{alignContent:"flex-start",display:"block",padding:'0 10%'}}>
    
     <DragDropContext onDragEnd={handleDragEnd} >
     
        <Grid sx={{justifyContent:'center'}} paddingTop={'5%'} gap={3}   container  >
        {list&& list.days.map((date:Days,i)=>{
       
      return  <Day key={i} plan={list}  index={i} day={date} />
        
        })}
        
        </Grid>
        </DragDropContext>
        
        </main>
        </PlanContext.Provider>}
      </>
  )
}

export default Schedule