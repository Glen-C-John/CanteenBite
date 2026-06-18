import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

let orderClients = [];

const streamOrders = (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 1. Tell AWS proxies (CloudFront/Nginx) NOT to buffer the stream
    res.setHeader('X-Accel-Buffering', 'no');

    res.flushHeaders();

    orderClients.push(res);

    // 2. The Heartbeat: Send an invisible ping every 20 seconds
    const heartbeat = setInterval(() => {
        try {
            if (!res.writableEnded) {
                // Sending a colon (:) is an SSE comment. 
                // The browser ignores it, but CloudFront sees traffic and keeps the connection alive.
                res.write(':\\n\\n');
            }
        } catch (err) {
            console.error("Heartbeat error", err);
            clearInterval(heartbeat);
        }
    }, 20000);

    // 3. Cleanup: Stop the heartbeat when the user closes the tab
    req.on('close', () => {
        clearInterval(heartbeat);
        orderClients = orderClients.filter(client => client !== res);
    });
};

const notifyOrderClients = () => {
    const data = `data: ${JSON.stringify({ type: 'update' })}\n\n`;
    orderClients.forEach(client => client.write(data));
};

// Placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL || "http://localhost:5174"; // Dynamically use the requester's origin

    try {
        const user = await userModel.findById(req.body.userId);
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            otp: otp,
            address: {
                firstName: user.firstName || user.name || "Unknown",
                lastName: user.lastName || "",
                phone: user.phone || "Not Provided",
                pickupTime: req.body.address.pickupTime
            }
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        // No delivery charges for pickup

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        notifyOrderClients();

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Temporary order verification
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            notifyOrderClients();
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// User orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId, payment: true });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ payment: true });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// API for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        notifyOrderClients();
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Verify OTP and set status to Delivered
const verifyOrderOtp = async (req, res) => {
    try {
        const { orderId, otp } = req.body;
        const order = await orderModel.findById(orderId);
        if (order.otp === otp) {
            order.status = "Delivered";
            await order.save();
            notifyOrderClients();
            res.json({ success: true, message: "Order Delivered" });
        } else {
            res.json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, streamOrders, verifyOrderOtp }
