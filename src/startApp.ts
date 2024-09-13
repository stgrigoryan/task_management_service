import { Express as ExpressType } from 'express';
import * as http from 'http';

import { mongoConnect } from './db/connect';
import gracefulShutdown from './gracefulShutdown';
import { config } from './config/config';

const startApp = async (app: ExpressType) => {
  try {
    console.log('Starting the app.')
    await setupConnections();
    const server = await setupServer(app);
    setupGlobalErrorHandler(server);
  } catch (error) {
    throw error;
  }
};

const setupServer = async (app: ExpressType) => {
  const port = config.port;
  return app.listen(port, () => {
    console.log(`App started on port: ${port}`);
  });
};

const setupConnections = async () => {
  await mongoConnect();
  console.log('Connected to MongoDB.');
};

const setupGlobalErrorHandler = (server: http.Server) => {
  process.on('SIGINT', async () => {
    try {
      await gracefulShutdown(server);
    } catch (error) {
      console.error(`Error during shutdown: ${error}`);
      process.exit(1);
    }
  });

  process.on('SIGTERM', async () => {
    try {
      await gracefulShutdown(server);
    } catch (error) {
      console.error(`Error during shutdown: ${error}`);
      process.exit(1);
    }
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error(`Unhandled rejection at: ${promise}, reason: ${reason}`);
    gracefulShutdown(server);
  });

  process.on('uncaughtException', (error) => {
    console.error(`Uncaught Exception: ${error}`);
    gracefulShutdown(server);
  });
};

export default startApp;
