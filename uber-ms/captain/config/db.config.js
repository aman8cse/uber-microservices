import mongoose from "mongoose";

export const connect = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected DB:", connection.connection.host);

    } catch (err) {
        console.log("Error connecting DB");
        process.exit(1);
    }
}