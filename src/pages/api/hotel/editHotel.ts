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

const {data,planId,hotelId}=req.body

try {
    // @ts-ignore
const plan=await Plan.findById(planId)


const hotelIndex=plan.hotels.findIndex((curHotel)=>curHotel._id==hotelId)

plan.hotels[hotelIndex].nightPrice=data.nightPrice;
plan.hotels[hotelIndex].start=data.start;
plan.hotels[hotelIndex].end=data.end;

 await plan.save()

         return res.status(201).json({success:true,hotels:plan.hotels[hotelIndex]})
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