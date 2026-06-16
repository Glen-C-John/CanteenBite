/* import express from "express"
 import {addFood} from "../controllers/foodController.js"
 import multer from "multer"

 const foodRouter = express.Router();


 //image storage engine
 const storage=multer.diskStorage({
     destination:"uploads",
     filename:(req,file,cb)=>{
         return cb(null,`${Date.now()}${file.originalname}`)
     }
 })

 const upload = multer({storage:storage})

 
 foodRouter.post("/add",upload.single('image'),addFood)


 export  default foodRouter;*/

import express from "express";
import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import { addFood, listFood, removeFood, updateAvailability, streamFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

// AWS S3 Configuration
let s3Client;
if (process.env.AWS_S3_BUCKET_NAME) {
    s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });
}

// Storage configuration (S3 or local disk)
const storage = process.env.AWS_S3_BUCKET_NAME && s3Client ?
    multerS3({
        s3: s3Client,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    }) :
    multer.diskStorage({
        destination: "uploads",
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    });

const upload = multer({ storage });

// Route to add food
foodRouter.post("/add", upload.single('image'), addFood);
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood);
foodRouter.get("/stream", streamFood);
foodRouter.post("/availability", updateAvailability);

export default foodRouter;

