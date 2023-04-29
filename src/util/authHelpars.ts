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

// export const googleSignIn= async (account:any,profile:any)=>{
//         const existingUser=await User.findById(account.userId)
// if(existingUser)return true ;
// else{
//     const existingEmail=await User.findOne({email:profile.email})
// if(existingEmail){
//     account.userId=existingEmail._id;
//     return true;
// }else{
//     try {
//     await User.create({email:profile.email,fullName:account.name,password:'Google AUTH'})
// return true
// } catch (error) {
//     if(error&&error instanceof mongoose.Error.ValidationError){
//       for(let field in error.errors){
//       const msg=error.errors[field].message
//       return false;
//       }
//   } 
// }}}
  
// }
