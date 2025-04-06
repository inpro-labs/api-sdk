import { PipeTransform, Injectable } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';
import { MicroserviceRequest } from '@/contracts/microservice-request';
import { ApplicationException } from '@/core';

/**
 * Pipe to validate only the 'data' field of a MicroserviceRequest using Zod schema.
 */
@Injectable()
export class ZodValidationPipe<T extends ZodSchema<unknown>>
  implements PipeTransform
{
  constructor(private schema: T) {}

  transform(payload: MicroserviceRequest): MicroserviceRequest {
    try {
      const validatedData = this.schema.parse(payload.data);

      payload.data = validatedData;

      return payload;
    } catch (error) {
      throw new ApplicationException(
        (error as ZodError).errors[0].message,
        400,
        'VALIDATION_ERROR',
      );
    }
  }
}
