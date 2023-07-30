import mongoose from 'mongoose'
import Place from './Place'

const Schema=mongoose.Schema

const newFlight=[{
  flightNumber:[String],
  booked:Boolean,
  departure:Date,
  arrival:Date,
  airline:[String],
  stops:Schema.Types.Mixed,
  addedMethod:String,
  origin:{lat:Number,lng:Number,iata:String,name:String},
  destination:{lat:Number,lng:Number,iata:String,name:String},
  position:String,
  price:Number,
  flightId:{ require:false,type:String},
  bookLink:{ require:false,type:String},
  flightDetails:[{ airline: String,
    bags_recheck_required: Boolean,
    cityCodeFrom: String,
    cityCodeTo: String,
    cityFrom: String,
    cityTo: String,
    combination_id: String,
    equipment:{ require:false,type:String},
    fare_basis: String,
    fare_category: String,
    fare_classes:String,
    fare_family: String,
    flight_no: Number,
    flyFrom: String,
    flyTo: String,
    guarantee: Boolean,
    id: String,
    local_arrival: Date,
    local_departure: Date,
    operating_carrier: String,
    operating_flight_no: String,
    return: Number,
    utc_arrival: Date,
    utc_departure: Date,
    vehicle_type: String,
    vi_connection: Boolean}]
}]

const PlanSchema = new mongoose.Schema({
  country:{type:String,required:[true,'Country is required']} ,
  city:{type:String,required:false},
  author:{type:String,required:[true,'User Not Authenticated']},
  header:{type:String,required:[true,'Title is required']},
 image: {type:String,required:[true,'Image is required']},
 start:{type:Date,required:[true,'Start Date is required']},
 end:{type:Date,required:[true,'End Date is required']},
 days:{type:[{date:{type:String,required:false},
  rutine:{type:[{budget:Number,dragId:String,position:{type:String,required:false},place:{ type:Schema.Types.ObjectId,ref:'Place'},description:{type:String,required:false}}]},
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
budget:{budget:Number,currency:String,transportation:[{name:String,category:String,price:Number}],expenses:[{name:String,category:String,price:Number}]},
hotels:[{place:{type:Schema.Types.ObjectId,ref:'Place'},nightPrice:Number,start:Date,end:Date}],
flights:newFlight,
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




 

  