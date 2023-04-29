import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  fullName: {type:String,required:[true,'Fullname is required']},
  email: {type:String,unique:true,required:[true,'Email is required'],match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Invaild email address']},
 password:{type:String,required:[true,'Password is required'],select:false},
})

export default mongoose.models.User || mongoose.model('User', UserSchema)