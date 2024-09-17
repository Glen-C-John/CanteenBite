import mongoose from "mongoose";
//db to backend connection
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://JosEph86:mondolol8604@cluster0.g5p8l.mongodb.net/food-del').then(()=>console.log("DB_Connected"));
}
