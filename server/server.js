import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerWebhooks from "./controllers/clerkWebhooks.js";

connectDB()

const app = express()
app.use(cors()) // enable cross-origin resourcee sharing

//Middleware
app.use(express.json())
app.use(clerkMiddleware())

//api to listen  t0 clerk webhooks
aap.use('/api/clerk', clerWebhooks);

app.get('/',(req, res)=> res.send("API is working "))

const PORT  = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`server running on port ${PORT}`));