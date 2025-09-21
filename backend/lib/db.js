import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
        console.log('Server will continue running without database connection');
        console.log('To fix this, please:');
        console.log('1. Install MongoDB locally, or');
        console.log('2. Update MONGO_URI in backend/.env with a valid MongoDB connection string');
    }
};