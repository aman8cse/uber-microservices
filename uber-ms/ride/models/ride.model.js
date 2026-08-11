import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },
    rider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['requested', 'accepted', 'started', 'completed'],
        default: 'requested'
    },
    fare: {
        type: Number,
    },
    distance: {
        type: Number,
    },

    duration: {
        type: Number,
    },

    driverLocation: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    },
    riderLocation: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export const rideModel = mongoose.model('Ride', rideSchema);