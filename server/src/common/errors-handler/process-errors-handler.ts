import { INestApplication, Logger } from '@nestjs/common';
import { Error } from 'mongoose';

const logger = new Logger('ProcessErrorHandler');
export function processErrorHandler(app: INestApplication) {
  // Unhandled Promise Rejections
  process.on('unhandledRejection', (error) => {
    void (async () => {
      try {
        logger.log('UNHANDLED REJECTION! 💥 Shutting down...', error);
        await app.close();
        process.exit(1);
      } catch (error) {
        console.error('Error 💥 during graceful Shutting down...', error);
        process.exit(1);
      }
    })();
  });

  // Uncaught Exceptions
  process.on('uncaughtException', (error: Error) => {
    void (async () => {
      try {
        logger.log('UNCAUGHT EXCEPTION! 💥 Shutting down...', error);
        await app.close();
        process.exit(1);
      } catch (error) {
        console.error('Error 💥 during graceful Shutting down...', error);
        process.exit(1);
      }
    })();
  });

  // Handle termination signal from systems like Docker, Kubernetes, or cloud providers
  process.on('SIGTERM', () => {
    // Log the signal reception
    logger.warn('📴 Received SIGTERM, shutting down...');
    // Exit the process cleanly
    process.exit(0);
  });

  // Handle interrupt signal — typically from Ctrl+C in the terminal
  process.on('SIGINT', () => {
    // Log the signal reception
    logger.log('🛑 Received SIGINT (Ctrl+C), shutting down...');
    // Exit the process cleanly
    process.exit(0);
  });
}
