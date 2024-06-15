import mongoose from 'mongoose';

const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log('Already connected to the database');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

export default connectToDatabase;
