import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

connectDB()
connectCloudinary

const app = express()
app.use(cors()) // enable cross-origin resourcee sharing

//Middleware
app.use(express.json())
app.use(clerkMiddleware())

//api to listen  t0 clerk webhooks
app.use('/api/clerk', clerWebhooks);

app.get('/',(req, res)=> res.send("API is working "))

app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bookings', bookingRouter)

const PORT  = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`server running on port ${PORT}`));