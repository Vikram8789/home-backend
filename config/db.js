import { connect } from "http2";
import mongoose from "mongoose";
export const connectDb=async()=>{
try{
await mongoose.connect(`${process.env.MONGO_URL}`);
console.log(`database is connected successfully`)
}catch(e){
    console.log(`error in db ${e}`.bgRed.white)
}
};
