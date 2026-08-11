import express from 'express'
import {register, login, logout, profile, toggleAvailibility} from '../controllers/captain.controller.js';
import { captainAuth } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', captainAuth, profile);
router.patch('/toggle-availibility', captainAuth, toggleAvailibility);

export {router};