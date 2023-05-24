
import { loginUser } from '@/util/authHelpars';
import { hash,compare } from 'bcryptjs';
import dbConnect from 'lib/dbConnect';
import User from 'models/User';
import type { NextApiRequest, NextApiResponse } from 'next';



export default async (req: NextApiRequest, res: NextApiResponse) => {
    dbConnect().catch(err=>res.json(err))

if(req.method==='GET'){
    const {email,token}=req.query

    
    try {
        //@ts-ignore
        
const user= await User.find({email:email})
if(user){
    const emailName=email+user.password
   const isCorrect=await compare(emailName,decodeURIComponent(String(token)))
if(isCorrect){
  return  res.status(200).json({success:true});
}else{
 return   res.status(404).json('Page not found');
}
   

}
res.status(404).json('Page not found');
  }
  catch (error) {
    console.error(error);
  return  res.status(400).json(error);
  }
}else if(req.method==='POST'){
    if(!req.body) return res.status(400).json('req body is empty');
    const {newPassword,email}=req.body

    
    try {
        //@ts-ignore
const user= await User.findOne({email:email})
if(user){
const hashedPassword= await hash(newPassword,12)
user.password=hashedPassword
await user.save()

  return  res.status(200).json({success:true});
}else{
 return   res.status(404).json('Page not found');
}
} catch (error) {
    console.error(error);
  return  res.status(400).json(error);
  }
}else{
  return  res.status(400).json('method not supported');

}

    
  
}