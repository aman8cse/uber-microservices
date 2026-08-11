import jwt from 'jsonwebtoken';
import { captainModel } from '../models/captain.model.js';
import { blacklistTokenModel } from '../models/blacklisttoken.model.js';

export const captainAuth = async(req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if(!token) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const isBlackListed = await blacklistTokenModel.findOne({ token });
        if(isBlackListed) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const captain = await captainModel.findById(decoded.id);
        if(!captain) {
            return res.status(400).json({message: "Unauthorized"});
        }

        req.captain = captain;
        next();
        
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}