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

const {planId,index,listItem,position}=req.body

try {
const plan=await Plan.findById(planId)


if(listItem.place){
    const place=await Place.findById(listItem.place._id)
    const newListItem=await {...listItem,place:place}
    await plan.days[index].rutine.push(newListItem)
}else{
    const place=await Place.findById(listItem._id)
     plan.days[index][position]=place
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

}else if (method==='DELETE'){
    if(!req.query)return res.status(400).json({error:'data is missing'})
    const {dragId,index,planId,placeId,position}=req.query
    try {
        //{$pull:{path:`days[${index}].rutine`,'dragId':dragId}}
        const plan=await Plan.findById(planId)
        await Place.findOneAndDelete({_id:placeId,location_id:null})
  
        if(dragId){
            const deletedPlace=plan.days[Number(index)].rutine.find((place:RoutineItem)=>place.dragId===dragId)
            if(deletedPlace.position){
                plan.days[Number(index)][String(deletedPlace.position)]=null
            }
            plan.days[Number(index)].rutine.pull({dragId:dragId})
           
        }else{
            plan.days[Number(index)][String(position)]=null
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