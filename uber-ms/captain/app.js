import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import { router as userRoutes } from './routes/captain.routes.js';
import { connect } from './services/rabbit.js';

const app = express();

connect();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use("/api", userRoutes);
app.get("/health", (req, res) => {
    res.send("Captain server is running");
})

export default app;