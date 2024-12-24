import mongoose from 'mongoose';
import config from '../config/config.js';
import { DatabaseConnectionError } from '../utils/custom.error.js';

const dbConnect = async () => {
  try {
    const mongoURL = process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/testDatabase' : config.mongo.URL;
    await mongoose.connect(mongoURL);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw new DatabaseConnectionError('Error de conexión a la base de datos');
  }
};

export default dbConnect;