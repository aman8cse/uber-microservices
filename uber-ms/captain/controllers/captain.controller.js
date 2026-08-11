import { blacklistTokenModel } from "../models/blacklisttoken.model.js";
import { captainModel } from "../models/captain.model.js";
import { subscribeToQueue } from "../services/rabbit.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(401).json({ message: "Some fields are missing" });
        }

        const captain = await captainModel.findOne({ email });

        if (captain) {
            return res.status(400).json({ message: "Captain already exists" });
        }

        const newCaptain = new captainModel({
            name, email, password
        });
        await newCaptain.save();

        const token = jwt.sign({ id: newCaptain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token);

        res.send({ message: "Captain registered successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const captain = await captainModel.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(401).json({ message: "captain not found" });
        }

        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token);

        res.send({ message: "captain logged in successfully" });

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        await blacklistTokenModel.create({ token });
        res.clearCookie('token');

        res.send({ message: "captain logged out successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const profile = async (req, res) => {
    try {
        res.send(req.captain);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const toggleAvailibility = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.captain._id);
        captain.isAvailable = !captain.isAvailable;
        await captain.save();

        res.send(captain);
    } catch (err) {
        return res.json(500).json({message: err.message});
    }
}

subscribeToQueue('new-ride', (data) => {
    console.log(JSON.parse(data))
})