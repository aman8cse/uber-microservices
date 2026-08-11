import { blacklistTokenModel } from "../models/blacklisttoken.model.js";
import { userModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(401).json({ message: "Some fields are missing" });
        }

        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new userModel({
            name, email, password
        });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token);

        res.send({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token);

        res.send({ message: "User logged in successfully" });

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        await blacklistTokenModel.create({ token });
        res.clearCookie('token');

        res.send({ message: "User logged out successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const profile = async (req, res) => {
    try {
        res.send(req.user);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}