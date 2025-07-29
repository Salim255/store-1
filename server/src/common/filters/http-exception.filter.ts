import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
// This decorator tells NestJS to catch all exceptions (not just HttpException)
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  logger = new Logger('Error handler💥');
  // This catch() method gets triggered whenever an exception is thrown in the app
  catch(exception: unknown, host: ArgumentsHost) {
    // Extract the context of the HTTP request
    const context = host.switchToHttp();

    // Get the response and request objects from the context
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    // Determine the HTTP status code to send
    // If the exception is an instance of HttpException, use its status
    // Otherwise, default to 500 (Internal Server Error)
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Determine the error message to return
    // If it's an HttpException error, use the provided message
    // Otherwise, use a generic fallback message
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Send a structured JSON response to the client
    response.status(status).json({
      statusCode: status, // The HTTP status code
      timestamp: new Date().toISOString(), // When the error occurred
      path: request.url,
      message, // The actual error message
    });
    this.logger.log(message);
  }
}
