
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose, { model } from "mongoose"
import dbConnect from "../../../../lib/dbConnect";
import Plan from "../../../../models/Plan";
import Place from 'models/Place';


export default async function handler (req:NextApiRequest, res:NextApiResponse) {
await dbConnect()

const { method } = req

dbConnect().catch(err=>res.json(err))
if(method==='POST'){
if(!req.body)return res.status(400).json({error:'data is missing'})

const {userId}=req.body
//if(!userNotGoogle){return res.status(409).json({error:'user is logged in from google'})}
//else{
try {
// @ts-ignore
     const userPlans=await Plan.find({author:userId}).populate({ 
          path: 'liked',
           populate: [{
           path: 'restaurants',
            model: Place
       },{
              path: 'hotels',
              model: Place
             },{
              path: 'attractions',
              model: Place
             }],
            
       }).populate({
          path:'days',
          populate:[
               {path:'rutine.place',model:Place},
               {path:'start',model:Place},
               {path:'end',model:Place},
          ]}).populate({
               path:'hotels.place',
               model:Place
          })
     

         return res.status(201).json({success:true,plans:userPlans})

} catch (error) {
     console.log(error)
    if(error&& error instanceof mongoose.Error.ValidationError){
         for(let field in error){
         
         const msg=error[field].message
         return res.status(409).json({error:msg})
         }
}else {return res.status(409).json({error: error})}}

}else if(method==='GET'){
    
          if(!req.query)return res.status(400).json({error:'data is missing'})
          
          const {userId,populate}=req.query
          try {
          if(populate){
               // @ts-ignore
               const userPlans=await Plan.find({author:userId}).populate({ 
                    path: 'liked',
                     populate: [{
                     path: 'restaurants',
                      model: Place
                 },{
                        path: 'hotels',
                        model: Place
                       },{
                        path: 'attractions',
                        model: Place
                       }],
                      
                 })
                 return res.status(200).json({success:true,plans:userPlans})
               }else{
                    // @ts-ignore
                    const userPlans=await Plan.find({author:userId})
                      return res.status(200).json({success:true,plans:userPlans})
               }
               //   .populate({
               //      path:'days',
               //      populate:[
               //           {path:'rutine.place',model:Place},
               //           {path:'start',model:Place},
               //           {path:'end',model:Place},
               //      ]}).populate({
               //           path:'hotels.place',
               //           model:Place
               //      })
               
          
                   
          
          } catch (error) {
               console.log(error)
              if(error&& error instanceof mongoose.Error.ValidationError){
                   for(let field in error){
                   
                   const msg=error[field].message
                   return res.status(409).json({error:msg})
                   }
          }else {return res.status(409).json({error: error})}}
}else{
    res.status(405).json({error:'Method not allowed'})
}

}