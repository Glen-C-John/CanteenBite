import mongoose from "mongoose";
//db to backend connection
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://glenchazhoor:glenjohn@cluster0.hfyok.mongodb.net/?').then(()=>console.log("DB_Connected"));
}
