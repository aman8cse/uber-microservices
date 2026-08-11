import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';
import { blacklistTokenModel } from '../models/blacklisttoken.model.js';

export const userAuth = async(req, res, next) => {
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

        const user = await userModel.findById(decoded.id);
        if(!user) {
            return res.status(400).json({message: "Unauthorized"});
        }

        req.user = user;
        next();
        
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}