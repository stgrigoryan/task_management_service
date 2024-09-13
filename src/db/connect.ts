import mongoose, { ConnectOptions } from 'mongoose';
import { config } from '../config/config';

const connectionOptions: ConnectOptions = {
  user: config.mongo.username,
  pass: config.mongo.password,
  dbName: config.mongo.dbName,
};

export const mongoConnect = () => {
  return mongoose.connect(config.mongo.url, connectionOptions);
};

export const mongoDisconnect = () => {
  return mongoose.disconnect();
};
