
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from "mongoose"
import dbConnect from "../../../../lib/dbConnect";
import Plan from "../../../../models/Plan";




export default async function handler (req:NextApiRequest, res:NextApiResponse) {
await dbConnect()

const { method } = req

dbConnect().catch(err=>res.json(err))
if(method==='GET'){
if(!req.query)return res.status(400).json({error:'data is missing'})

const {userId}=req.query

try {
    const plans=await Plan.find({author:userId})
         return res.status(200).json({success:true,count:plans.length})

} catch (error) {
    return res.status(409).json({error: error})
}

}else{
    res.status(405).json({error:'Method not allowed'})
}

}