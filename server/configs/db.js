import mongoose from "mongoose";

const connectDB =  async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("connected succesfully")
    } catch (error){
       console.log("unable to connect to database" )
       console.log(error.massage)
    }

    
}
export default connectDB;