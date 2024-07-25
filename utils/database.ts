import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async ()=>{
    mongoose.set("strictQuery", true);

    if(isConnected){
        console.log("DB is connected");
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
          dbName: "blog",
        });
        isConnected = true;
        console.log("DB has connected");
        
    } catch (error) {
        console.log(error);
    }
}