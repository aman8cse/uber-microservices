import express from 'express'
import {register, login, logout, profile} from '../controllers/user.controller.js';
import { userAuth } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', userAuth, profile);

export {router};