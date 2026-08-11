import express from 'express'
import { userAuth } from '../middleware/auth.middleware.js';
import { createRide } from '../controllers/ride.controller.js';
const router = express.Router();

router.post("/create-ride", userAuth, createRide);

export {router};