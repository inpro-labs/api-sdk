import { Catch, Logger, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { MicroserviceResponse } from '@/contracts/microservice-response';
import { ObservableResponse } from '@/core/observable-response';
import { ApplicationException } from '@/core/errors/application-exception';
import { ZodError } from 'zod';

/**
 * A global exception filter for microservices that catches and transforms exceptions
 * into standardized microservice error responses.
 *
 * Handles:
 * - Validation errors (Zod)
 * - Application exceptions
 * - Unhandled exceptions (logs them)
 */
@Catch()
export class MicroserviceExceptionFilter implements RpcExceptionFilter {
  /**
   * Catches exceptions thrown during microservice communication
   * and transforms them into a `MicroserviceResponse` error format.
   *
   * @param {any} exception - The thrown exception.
   * @returns {Observable<MicroserviceResponse<any>>} An observable that emits the error response.
   */
  catch(exception: any): Observable<MicroserviceResponse<any>> {
    let response: MicroserviceResponse<any>;

    if (exception instanceof ZodError) {
      response = ObservableResponse.err(
        exception.errors[0].message,
        400,
        'VALIDATION_ERROR',
      );
    } else if (exception instanceof ApplicationException) {
      response = ObservableResponse.err(
        exception.message,
        exception.statusCode,
        exception.code,
      );
    } else {
      const logger = new Logger('Unhandled Error');

      logger.error(exception);

      response = ObservableResponse.err(
        'Internal server error',
        500,
        'INTERNAL_SERVER_ERROR',
      );
    }

    return throwError(() => response);
  }
}
