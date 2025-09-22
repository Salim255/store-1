import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

class BaseHttpException {
  constructor(
    public statusCode: number, // HTTP status code (e.g. 404, 500)
    public message: string | object, // Human-readable message or detailed
    public path: string, // The request path (e.g /products)
    public timestamp = new Date().toISOString(), // ISO timestamp of when the error occurred
  ) {}
}

// This decorator tells NestJS to catch all exceptions (not just HttpException)
// Catch-all filter that handles:
// - HttpException (NestJs built-in)
// - MongoDB errors like E1100 (duplicate key)
// - Mongoose validation errors
// -Unknown/internal server errors
@Catch()
export class HttpExceptionsErrorHandler implements ExceptionFilter {
  logger = new Logger('Error handler💥');
  // This catch() method gets triggered whenever an exception is thrown in the app
  catch(exception: unknown, host: ArgumentsHost) {
    // Extract the context of the HTTP request
    const context = host.switchToHttp();

    // Get the response and request objects from the context
    const response = context.getResponse<Response>(); // Get response object
    const request = context.getRequest<Request>(); // Get request object

    let status = HttpStatus.INTERNAL_SERVER_ERROR; // Default to 500
    let message: string | object = 'Internal server error'; // Default message

    // Handle NestJs HttpExceptions (like BadRequestException, NotFoundException, etc.)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    // Handle MongoDB duplicate key error (code 11000)
    else if (
      typeof exception === 'object' &&
      exception !== null &&
      'code' in exception &&
      exception.code === 11000
    ) {
      status = HttpStatus.CONFLICT; // 409 Conflict
      interface MongoDuplicateKeyError {
        code: number;
        keyValue?: Record<string, unknown>;
        message: string;
      }
      const ex = exception as MongoDuplicateKeyError;
      message = {
        error: 'Duplicate key error',
        keyValue: ex.keyValue, // e.g {name: "Wireless Mouse"}
        detail: ex.message,
      };
    }

    // Handle Mongoose validation errors (e.g. required fields, custom validators)
    else if (
      typeof exception === 'object' &&
      exception !== null &&
      'name' in exception &&
      (exception as { name: string }).name === 'ValidationError'
    ) {
      status = HttpStatus.BAD_REQUEST;
      type MongooseValidationError = {
        errors: { [key: string]: { message: string } };
      };
      const validationError = exception as unknown as MongooseValidationError;
      const errors = Object.values(validationError.errors).map((err) => {
        if (
          err &&
          typeof err === 'object' &&
          'message' in err &&
          typeof err.message === 'string'
        ) {
          return err.message;
        }
        return 'Unknown validation error';
      });

      message = {
        error: 'Validation Error',
        details: errors,
      };
    }

    // Format response using our helper class
    const errorResponse = new BaseHttpException(status, message, request.url);
    // Send a structured JSON response to the client
    response.status(status).json(errorResponse);
  }
}
