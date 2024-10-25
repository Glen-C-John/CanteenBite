/*import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item

const addFood = async (req,res) =>{
    let image_filename=`${req.file.filename}`;
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
    })
    try{
        await food.save();
        res.json({success:true,message:"food added"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
        
    }
}

export {addFood}*/

import foodModel from "../models/foodModel.js";
import fs from 'fs'

const addFood = async (req, res) => {
    // Trim whitespace from request body fields
    const name = req.body['name']?.trim(); // Note the space before 'name'
    const description = req.body.description?.trim();
    const price = parseFloat(req.body.price);
    const category = req.body.category?.trim();

    console.log('Request Body:', { name, description, price, category });
    console.log('Request File:', req.file);

    if (!name || !description || isNaN(price) || !category) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const image_filename = req.file ? req.file.filename : 'default.jpg';

    const food = new foodModel({
        name,
        description,
        price,
        category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};

//all food list
const listFood = async (req,res) =>{
        try{
            const foods= await foodModel.find({});
            res.json({success:true,data:foods})
        }catch(error){
            console.log("error")
            res.json({success:false,message:"error"})
        }
}

//remove food

const removeFood = async (req,res) =>{
    try{
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food removed"})
}catch(error){
        console.log(error);
        res.json({success:false,message:error})
    }
}

export { addFood ,listFood,removeFood};
