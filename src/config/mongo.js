import mongoose from 'mongoose';
import config from './config.js';

const dbConnect = async () => {
  try {
    await mongoose.connect(config.mongo.URL);
    console.log(`**** CONEXION A MONGO CORRECTA ****`);
  } catch (err) {
    console.log(`**** ERROR DE CONEXION A MONGO ****`, err);
  }
};

export default dbConnect;