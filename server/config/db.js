import mongoose, { mongo } from "mongoose";

export const connectDB = async ()=>{
    try{
        mongoose.connection.on('connected' , ()=> console.log('Database connected'))
        await mongoose.connect(`${process.env.MONGODB_URI}/ChitChat`)
    }
    catch(err){
        console.log(err.message)
    }
}