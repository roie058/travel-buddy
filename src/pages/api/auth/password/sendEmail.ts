import PasswordLink from '@/components/emailTamplates/PasswordLink';
import { hash } from 'bcryptjs';
import dbConnect from 'lib/dbConnect';
import User from 'models/User';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    dbConnect().catch(err=>res.json(err))
    const {email}=req.body
if(req.method==='POST'){
    try {
        //@ts-ignore
const user= await User.find({email:email})
if(user){
    const emailName=email+user.password
    const  hashedEmailandName= encodeURIComponent(await hash(emailName,12))
  
    const data = await resend.sendEmail({
        from:process.env.EMAIL_COMPANY||'',
      to: email || '',
      subject: "Travel Buddy | Password Recovery Link",
      react: PasswordLink({ userFirstname: user.fullname, resetPasswordLink:`${process.env.BACKEND_URL}/forget-password/${email}/${hashedEmailandName}` }),
    });

  return  res.status(200).json({success:true, data});
}
res.status(200).json({success:true});
  }
  catch (error) {
    console.error(error);
  return  res.status(400).json(error);
  }
}else{
  return  res.status(405).json('method not supported');

}

    
  
}