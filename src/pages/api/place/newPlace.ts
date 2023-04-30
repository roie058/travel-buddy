import dbConnect from "lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next'


import Plan from "models/Plan";
import Place from "models/Place";
import { IPlace } from "@/dummyData";
import { Hotel } from "@/components/pageCompnents/Schedule";





export default async function handler (req:NextApiRequest, res:NextApiResponse) {
await dbConnect()

const { method } = req

dbConnect().catch(err=>res.json(err))
if(method==='POST'){
if(!req.body)return res.status(400).json({error:'data is missing'})
if(req.body.category){


const {place,planId,category}:{place:IPlace,planId:string,category:string}=req.body



const isExist=await Place.findOne({location_id:place.location_id})
const plan =await Plan.findById(planId)

if(isExist&&plan){
try {
  //check if the plan is already in this one.
 await isExist.likedId.push(plan);
 await plan.liked[category].push(isExist);

 await isExist.save()
await plan.save()
  return res.status(201).json({success:true,isExist})
} catch (error) {
    if(error){
        // for(let field in error.errors){
        // const msg=error.errors[field].message
        // return res.status(409).json({error:msg})
        // }
        return res.status(409).json({error:error})
      }
}

}else if(plan){

try {
const likedId=[plan,]
    const newPlace=await Place.create({likedId:likedId,...place}) 
   await plan.liked[category].push(newPlace);
  await plan.save()
    
         return res.status(201).json({success:true,newPlace})

} catch (error) {
    
    if(error){
        //  for(let field in error.errors){
        //  const msg=error.errors[field].message
        //  return res.status(409).json({error:msg})
        //  }
         return res.status(409).json({error:error}) 
}}

}else{
    return res.status(409).json({error:'Plan not exist'})
}

}else{
const {place}=req.body
try {
const newPlace=await Place.create(place)
return res.status(201).json({success:true,newPlace})
} catch (error) {
  return res.status(409).json({error})
}


}

}else if(method==='PATCH'){
  if(!req.body)return res.status(400).json({error:'data is missing'})
try {
  const {place,planId,category}:{place:IPlace,planId:string,category:string}=req.body
  const doc=await Place.findOneAndUpdate({location_id:place.location_id},{$pull:{likedId:planId}},{ safe: true })
 
  const plan =await Plan.findByIdAndUpdate(planId,{$pull:{['liked.'+category]:doc._id}},{ safe: true })
  const hotelIndex=plan.hotels.findIndex((hotel:Hotel)=>hotel.place._id===doc._id)
  plan.hotels.splice(hotelIndex,1)
  await plan.save()
  return res.status(201).json({success:true,plan})
} catch (error) {
  if(error){
     return res.status(409).json({error:error}) 
}
}}
else{
   return res.status(405).json({error:'Method not allowed'})
}

}