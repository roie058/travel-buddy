import User from 'models/User'
import mongoose from 'mongoose'
import {signIn} from 'next-auth/react'

export interface LoginUserParams{
    email:string,
    password:string,
}

export const loginUser=async({email,password}:LoginUserParams)=>{
    
const res=await signIn('credentials',{
    redirect:false,
    email,
    password
})

return res


}

