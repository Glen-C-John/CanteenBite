import  orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order from frontend
const placeOrder= async(req,res) => {

    const frontend_url = "http://localhost:5173"     //update frontend url
    try{
        const neworder = new orderModel({
            userId:req.body.userId,
            item:req.body.items,
            amount:req.body.amount,
            department:req.body.department
        })
        await neworder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        const line_item=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_Data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"deliver charge"   //to removeeeeeeeee  ///////////////reminderrrrrrr!!!!!!!!!!!
                },
                unit_amount:2*100*80
            },
            quantity:1

        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder_id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder_id}`,

        })
        res.json({success:true,session_url:session.url})

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

const verifyOrder = async(req,res)=>{
    const {orderId,success}=req.body;
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({succes:"false",message:"not paid"})
        }
    
    }catch(error){
            console.log(error)
            res.json({success:false,message:"error"})
        }
    }

    //user orders for frontend
    const userOrders = async (req,res) => {
        try{
            const orders = await orderModel.find({userId:req.body.userId})
            res.json({success:true,data:orders})
        }catch(error){
            console.log(error)
            res.json({success:false,message:"Error"})
        }
    }
//listing orders fro admin panel
const listOrders = async (req,res) => {
    try{
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error})
    }
}

//api for updating order status
const updateStatus= async (req,res) =>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"status Updated"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
    }
}
export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}
