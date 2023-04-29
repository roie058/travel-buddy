import dbConnect from "lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from "mongoose";
import Plan from "models/Plan";
import { Expense } from "@/pages/plans/[planId]/schedule";
export interface IPlan{
    
}


export default async function handler (req:NextApiRequest, res:NextApiResponse) {
await dbConnect()

const { method } = req

dbConnect().catch(err=>res.json(err))
if(method==='DELETE'){
if(!req.query)return res.status(400).json({error:'data is missing'})

const {planId,expenseId,expenseType}=req.query

try {
const plan=await Plan.findById(planId)

const expenseIndex=plan.budget[expenseType].findIndex((expense:Expense)=>expense._id===expenseId)
plan.budget[expenseType].splice(expenseIndex,1)
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