import express from "express";
import cors from "cors";
import limiter from "./middlewares/rateLimiter.js";
import mongoose from "mongoose";
import apiRoutes from "./routes/apiRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
const app = express()

//middleware
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }))
app.use(express.json())
app.use(limiter)


//Database Connection

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Database Connected'))
.catch((err)=>console.log('mongodb connection error',err))

//Api Routes
app.use('/api',apiRoutes)


//Error handeling
app.use(errorHandler)

app.listen(process.env.PORT,()=>
    console.log(`Server is running on port ${process.env.PORT}`))


