import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';
import { MicroserviceResponse } from '@/contracts/microservice-response';
import { Response } from '@/core/response';
import { ApplicationException } from '@/core/errors/application-exception';
import { ZodError } from 'zod';

@Catch()
export class MicroserviceExceptionFilter implements RpcExceptionFilter {
  catch(exception: any) {
    let response: MicroserviceResponse<any>;

    if (exception instanceof ZodError) {
      response = Response.err(
        exception.errors[0].message,
        'VALIDATION_ERROR',
        400,
      );
    } else if (exception instanceof ApplicationException) {
      response = Response.err(
        exception.message,
        exception.code,
        exception.statusCode,
      );
    } else {
      console.error('[Unhandled Error]', exception);

      response = Response.err(
        'Internal server error',
        'INTERNAL_SERVER_ERROR',
        500,
      );
    }

    return throwError(() => response);
  }
}
