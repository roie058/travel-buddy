import mongoose from 'mongoose'
import Place from './Place'

const Schema=mongoose.Schema
const PlanSchema = new mongoose.Schema({
  country:{type:String,required:[true,'Country is required']} ,
  city:{type:String,required:false},
  author:{type:String,required:[true,'User Not Authenticated']},
  header:{type:String,required:[true,'Title is required']},
 image: {type:String,required:[true,'Image is required']},
 start:{type:Date,required:[true,'Start Date is required']},
 end:{type:Date,required:[true,'End Date is required']},
 days:{type:[{date:{type:String,required:false},
  rutine:{type:[{budget:Number,dragId:String,position:{type:String,required:false},place:{ type:Schema.Types.ObjectId,ref:'Place'}}]},
  start:{type:Schema.Types.ObjectId,ref:'Place'},
  breakfest:{type:Schema.Types.ObjectId,ref:'Place'},
  mainAttraction:{type:Schema.Types.ObjectId,ref:'Place'},
  lunch:{type:Schema.Types.ObjectId,ref:'Place'},
  dinner:{type:Schema.Types.ObjectId,ref:'Place'},
  end:{type:Schema.Types.ObjectId,ref:'Place'},
budget:Number,
  flight:String,
  weather:{temp:String,rainProb:String,weatherType:String,icon:String}
}],required:true},
tags:[String],
budget:{budget:Number,transportation:[{name:String,category:String,price:Number}],expenses:[{name:String,category:String,price:Number}]},
hotels:[{place:{type:Schema.Types.ObjectId,ref:'Place'},nightPrice:Number,start:Date,end:Date}],
flights:[{flightNumber:String,start:Date,end:Date,airline:{name:String,iata:String,country:String},origin:{lat:Number,lng:Number,iata:String,name:String},destination:{lat:Number,lng:Number,iata:String,name:String},position:String,price:Number}],
liked:{restaurants:[{type:Schema.Types.ObjectId,ref:'Place'}],hotels:[{type:Schema.Types.ObjectId,ref:'Place'}],attractions:[{type:Schema.Types.ObjectId,ref:'Place'}]}
})

PlanSchema.post('findOneAndDelete',async(doc)=>{
  if (doc) {
  const likedList= [...doc.liked.restaurants,...doc.liked.hotels,...doc.liked.attractions]



    await Place.updateMany({
        _id: {
            $in: likedList
        }
    },{$pull:{likedId:doc._id}})
}
})


export default mongoose.models.Plan || mongoose.model('Plan', PlanSchema)