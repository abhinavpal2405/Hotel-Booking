import mongoose from "mongoose";

const connectDB =  async()=>{
    try {
        mongoose.connection.on('connected',()=> console.log("Databse Connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/HOTEL-BOOKING`)
    } catch (error){
       console.log("unable to connect to database" )
       console.log(error.massage)
    }

    
}
export default connectDB;