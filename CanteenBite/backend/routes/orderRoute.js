import express from "express"
import authMiddleware from "../middleware/auth.js"
import {placeOrder,verifyOrder,userOrders,listOrders, updateStatus, streamOrders, verifyOrderOtp} from "../controllers/orderController.js"
const orderRouter= express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get('/list',listOrders)
orderRouter.post('/status',updateStatus)
orderRouter.get('/stream', streamOrders)
orderRouter.post('/verify-otp', verifyOrderOtp)

export default orderRouter;
