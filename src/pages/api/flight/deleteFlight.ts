import dbConnect from "lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from "mongoose";
import Plan from "models/Plan";
export interface IPlan{
    
}


export default async function handler (req:NextApiRequest, res:NextApiResponse) {
await dbConnect()

const { method } = req

dbConnect().catch(err=>res.json(err))
if(method==='DELETE'){
if(!req.query)return res.status(400).json({error:'data is missing'})

const {planId,flightId}=req.query

try {
    // @ts-ignore
const plan=await Plan.findById(planId)
const flightList=plan.flights.filter((flight)=>flight._id!=flightId)
plan.flights=flightList
await plan.save()

         return res.status(201).json({success:true,plan})

} catch (error) {
    if(error&&error instanceof mongoose.Error.ValidationError){
         for(let field in error.errors){
         const msg=error.errors[field].message
         return res.status(409).json({error:msg})
         }
}}

}
//}
else{
    res.status(405).json({error:'Method not allowed'})
}

}