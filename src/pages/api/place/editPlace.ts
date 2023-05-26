import dbConnect from "lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from "mongoose";
import Plan from "models/Plan";
import Place from "models/Place";
import { RoutineItem } from "@/components/ui/calender/DayList";



export default async function handler (req:NextApiRequest, res:NextApiResponse) {
await dbConnect()

const { method } = req

dbConnect().catch(err=>res.json(err))
if(method==='PATCH'){
if(!req.body)return res.status(400).json({error:'data is missing'})

const {position,planId,index,place,budget,dragId,description}=req.body



try {
    // @ts-ignore
  const plan=await Plan.findById(planId)
  const placeIndex=plan.days[index].rutine.findIndex((place:RoutineItem)=>place.dragId==dragId)
//no dragId

  const lastPosition=plan.days[index].rutine[placeIndex].position


if(lastPosition){
    
    plan.days[index][lastPosition]=null;

}
 
  if(position&& position !== 0){
    // @ts-ignore
    const docPlace=await Place.findById(place._id)
    if(plan.days[index][position] && plan.days[index][position]!== place._id ){

       const otherRoutineIndex= plan.days[index].rutine.findIndex((item:any)=> item.place._id==String(plan.days[index][position])) 
       
       plan.days[index].rutine[otherRoutineIndex].position=undefined

    }
      plan.days[index][position]=docPlace
      plan.days[index].rutine[placeIndex].set({position:position,budget:budget,description:description});

 }else{
    plan.days[index].rutine[placeIndex].set({budget:budget,position:0,description:description});

 }

await plan.save()

         return res.status(201).json({success:true,plan})

} catch (error) {
    if(error&&error instanceof mongoose.Error.ValidationError){
         for(let field in error.errors){
         const msg=error.errors[field].message
         return res.status(409).json({error:msg})
         }
}else{
    return res.status(409).json({error})

 }}

}
//}
else{
    res.status(405).json({error:'Method not allowed'})
}

}