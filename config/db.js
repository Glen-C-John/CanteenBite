import mongoose from "mongoose";
//db to backend connection
export const connectDB = async () => {
    await mongoose.connect('apna_mongodb__dalo').then(()=>console.log("DB_Connected"));
}
