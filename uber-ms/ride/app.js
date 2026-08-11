import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import {router as rideRouter} from './routes/ride.routes.js';
import { connect } from './services/rabbit.js';

connect();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use("/api", rideRouter)
app.get("/health", (req, res) => {
    res.send({message: "Ride server is running"});
})

export default app;