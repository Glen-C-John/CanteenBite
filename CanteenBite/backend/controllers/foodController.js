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
import fs from 'fs';
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3 Client
let s3Client;
const bucketName = process.env.AWS_S3_BUCKET_NAME || process.env.S3_BUCKET_NAME;

if (bucketName) {
    s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_S3_SECRET_KEY,
        }
    });
}

// We store all connected admin dashboards in this array
let clients = [];

// ==========================================
// 1. BROADCAST HELPER FUNCTION
// ==========================================
const notifyClients = async () => {
    try {
        const foods = await foodModel.find({});
        const data = `data: ${JSON.stringify({ success: true, data: foods })}\n\n`;

        clients.forEach(client => {
            // Safety check: Only write if the connection is still alive
            if (!client.writableEnded) {
                client.write(data);
            }
        });
    } catch (error) {
        console.error("Error notifying clients", error);
    }
};

// ==========================================
// 2. LIVE STREAMING FUNCTION (For Admin Panel)
// ==========================================
const streamFood = (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Tell AWS proxies (CloudFront/Nginx) NOT to buffer the stream
    res.setHeader('X-Accel-Buffering', 'no');

    // Instantly establish the connection
    res.flushHeaders();

    clients.push(res);

    // The Heartbeat: Send an invisible ping every 20 seconds
    const heartbeat = setInterval(() => {
        try {
            if (!res.writableEnded) {
                // Sending a colon (:) is an SSE comment. 
                // The browser ignores it, but CloudFront sees traffic and keeps the connection alive.
                res.write(':\n\n');
            }
        } catch (err) {
            console.error("Heartbeat error", err);
            clearInterval(heartbeat);
        }
    }, 20000);

    // Cleanup: Stop the heartbeat when the user closes the tab
    req.on('close', () => {
        clearInterval(heartbeat);
        clients = clients.filter(client => client !== res);
        res.end();
    });
};

// ==========================================
// 3. STANDARD CONTROLLER FUNCTIONS
// ==========================================

// Add food item
const addFood = async (req, res) => {
    // Trim whitespace from request body fields
    const name = req.body['name']?.trim();
    const description = req.body.description?.trim();
    const price = parseFloat(req.body.price);
    const category = req.body.category?.trim();

    console.log('Request Body:', { name, description, price, category });
    console.log('Request File:', req.file);

    if (!name || !description || isNaN(price) || !category) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // If uploaded to S3, req.file.location holds the full absolute URL string.
    // If uploaded locally, fallback to the filename string.
    const image_filename = req.file
        ? (req.file.location || req.file.key || req.file.filename)
        : 'default.jpg';

    const food = new foodModel({
        name,
        description,
        price,
        category,
        image: image_filename,
    });

    try {
        await food.save();
        await notifyClients(); // Update admins instantly
        res.json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log("error");
        res.json({ success: false, message: "error" });
    }
}

// Remove food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (bucketName && s3Client) {
            try {
                // If the image is a full S3 URL, extract just the object key
                const imageKey = food.image.startsWith("http") 
                    ? decodeURIComponent(new URL(food.image).pathname.substring(1)) 
                    : food.image;

                await s3Client.send(new DeleteObjectCommand({
                    Bucket: bucketName,
                    Key: imageKey
                }));
            } catch (s3Err) {
                console.error("Error deleting from S3:", s3Err);
            }
        }

        // Also attempt to delete locally just in case it's a legacy file
        fs.unlink(`uploads/${food.image}`, () => { });

        await foodModel.findByIdAndDelete(req.body.id);
        await notifyClients(); // Update admins instantly

        res.json({ success: true, message: "Food removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || "Error" });
    }
}

// Update Availability
const updateAvailability = async (req, res) => {
    try {
        const { id, available } = req.body;
        await foodModel.findByIdAndUpdate(id, { available });

        await notifyClients(); // Update admins instantly

        res.json({ success: true, message: "Availability updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating availability" });
    }
}

export { addFood, listFood, removeFood, updateAvailability, streamFood };