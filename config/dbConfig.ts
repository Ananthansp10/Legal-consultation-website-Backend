
import mongoose from 'mongoose';

require('dotenv').config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI  = process.env.MONGO_URI!

    await mongoose.connect(mongoURI, {
      dbName: 'LegalConsultation',
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;
