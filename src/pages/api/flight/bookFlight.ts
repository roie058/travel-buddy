import dbConnect from "lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from "mongoose";
import Plan from "models/Plan";



export default async function handler (req:NextApiRequest, res:NextApiResponse) {
await dbConnect()

const { method } = req

dbConnect().catch(err=>res.json(err))
if(method==='PATCH'){
if(!req.body)return res.status(400).json({error:'data is missing'})
const {planId,flightId}=req.body

try {
    // @ts-ignore
const plan=await Plan.findById(planId)

const flightIndex=plan.flights.findIndex((curFlight)=>curFlight._id==flightId)

plan.flights[flightIndex].booked=!plan.flights[flightIndex].booked;
 await plan.save()
         return res.status(200).json({success:true,flight:plan.flights[flightIndex]})

} catch (error) {
    if(error&&error instanceof mongoose.Error.ValidationError){
         for(let field in error.errors){
         const msg=error.errors[field].message
         return res.status(409).json({error:msg})
         }
        
}else{
    return res.status(401).json({error})
 }

}

}
//}
else{
    res.status(405).json({error:'Method not allowed'})
}

}