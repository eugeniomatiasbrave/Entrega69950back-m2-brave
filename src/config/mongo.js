import mongoose from 'mongoose';
import config from './config.js';
import { DatabaseConnectionError } from '../utils/custom.error.js';

const dbConnect = async () => {
  try {
    await mongoose.connect(config.mongo.URL);
  } catch (err) {
    throw new DatabaseConnectionError('Error de conexión a la base de datos');
  }
};

export default dbConnect;