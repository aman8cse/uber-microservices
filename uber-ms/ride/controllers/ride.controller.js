import { rideModel } from '../models/ride.model.js';
import { pulblishToQueue, subscribeToQueue } from '../services/rabbit.js';

export const createRide = async (req, res, next) => {
    try {
        const {pickup, destination} = req.body;

        const newRide = new rideModel({
            rider: req.user._id,
            from: pickup, 
            to: destination
        });
        
        await newRide.save();
        pulblishToQueue('new-ride', JSON.stringify(newRide));

        res.send(newRide);

    } catch (err) {
        res.status(400).json({message: err.message});
    }
}