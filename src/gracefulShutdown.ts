import { mongoDisconnect } from './db/connect';
import * as http from 'http';

export const gracefulShutdown = async (server: http.Server) => {
  console.log('Starting graceful shutdown');

  server.close((error) => {
    if (error) {
      console.error(`Error closing Express server: ${error}`);
    } else {
      console.log('Express server closed.');
    }
  });

  await mongoDisconnect();
  console.log('MongoDB connection closed.');

  console.log('Graceful shutdown complete.');
  process.exit(0);
};

export default gracefulShutdown;
