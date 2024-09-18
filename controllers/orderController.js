import  orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order from frontend
const placeOrder= async(req,res) => {

    const frontend_url = "http://localhost:5173"
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

    }
}

export {placeOrder}
