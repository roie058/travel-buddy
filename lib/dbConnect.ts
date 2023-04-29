import mongoose from "mongoose";

const {MONGODB_URI} = process.env





  async function dbConnect () {

    if (!MONGODB_URI) {
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
      )
    }
 try {
  const {connection}= await mongoose.connect(MONGODB_URI);

  if(connection.readyState===1){
    return Promise.resolve(true)
  }
 } catch (error) {
  return Promise.reject(error)
 }
}

export default dbConnect