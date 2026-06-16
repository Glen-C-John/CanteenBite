import 'dotenv/config'
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
const allowedOrigins = [
    'https://main.d1v3lo75so97c4.amplifyapp.com',   // User App
    'https://main.ds2hmh70t7m84.amplifyapp.com',  // Admin App
    'http://localhost:3000',                          // Local React testing
    'http://localhost:5173'                           // Local Vite testing
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like Postman or curl)
        if (!origin) return callback(null, true);

        // If the origin is NOT in our allowed list, reject it
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, // Required if your frontend sends tokens or cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));

//DB connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, '0.0.0.0', () => {
    console.log(`server started on port:${port}`)
})