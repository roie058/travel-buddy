import mongoose from 'mongoose'

const PlaceSchema = new mongoose.Schema({
likedId:[{$type: mongoose.Types.ObjectId,ref:'Plan'}],
  address:String
,awards:{$type:Array,required:false}
,booking:{provider: String, url: String}
,category:{key: String, name: String}
,cuisine:{$type:Array,required:false}
,description:String
,email:String
,latitude:String
,location_id:String
,location_String:String
,longitude:String
,name:String
,num_reviews:String
,phone:String
,photo:{images:Object, is_blessed: Boolean, uploaded_date: String, caption: String, id: String}
,price_level:String
,ranking:String
,rating:String
,reserve_info:{id: String, provider: String, provider_img: String, booking_partner_id: String}
,web_url:String,
website:String,
price: String,
business_listings:{ mobile_contacts: [],desktop_contacts:[]}
},{typeKey:'$type'})




export default    mongoose.models.Place ||  mongoose.model('Place', PlaceSchema)