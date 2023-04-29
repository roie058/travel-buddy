import mongoose from 'mongoose'


const Schema=mongoose.Schema

const DaySchema = new mongoose.Schema({
  planId:{type:Schema.Types.ObjectId,ref:'Plan'},
  date:{type:String,required:false},
  rutine:[{type:Schema.Types.ObjectId,ref:'Place'}],
  start:{type:Schema.Types.ObjectId,ref:'Place'},
  breakfest:{type:Schema.Types.ObjectId,ref:'Place'},
  lunch:{type:Schema.Types.ObjectId,ref:'Place'},
  dinner:{type:Schema.Types.ObjectId,ref:'Place'},
  end:{type:Schema.Types.ObjectId,ref:'Place'},
  flight:String
})



export default mongoose.models.Day || mongoose.model('Day', DaySchema)