import { hash } from "bcryptjs"
import dbConnect from "lib/dbConnect"
import User from "models/User"
import mongoose from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import { DefaultSession } from "next-auth"

export interface IUser{
    _id:string,
    id?:string,
    email:string,
    fullName:string
}

export interface NewSesstion extends DefaultSession  {
    user?:DefaultSession['user']&{
      id?:string
    }
    expires:DefaultSession["expires"]|undefined
    
    }

 const handler = async (req:NextApiRequest,res:NextApiResponse)=>{
dbConnect().catch(err=>res.json(err))
if(req.method==='POST'){
if(!req.body)return res.status(400).json({error:'data is missing'})

const {fullName,email,password}=req.body
// @ts-ignore
const userExist=await User.findOne({email})
if(userExist){return res.status(409).json({error:'user is already exists'})}
else{
    if(password.length<6)return res.status(409).json({error:'Password must be at least six characters long'})
const hashedPassword= await hash(password,12)
try {
    // @ts-ignore
    const data=await User.create({fullName,email,password:hashedPassword}) 

    const user={
             email:data.email,
             fullName:data.fullName,
             id:data._id
         }

         return res.status(201).json({success:true,user})

} catch (error) {
    if(error&&error instanceof mongoose.Error.ValidationError){
         for(let field in error.errors){
         const msg=error.errors[field].message
         return res.status(409).json({error:msg})
         }
}}

}
}
else{
    res.status(405).json({error:'Method not allowed'})
}

}
export default  handler