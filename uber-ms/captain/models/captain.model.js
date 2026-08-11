import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const captainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    isAvailable: {
        type: Boolean,
        default: false
    }
});

captainSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

captainSchema.methods.comparePassword = async function (password) {
    if (!password || !this.password) {
        throw new Error("Password comparison failed: missing data");
    }
    return await bcrypt.compare(password, this.password);
}

export const captainModel = mongoose.model('captain', captainSchema);