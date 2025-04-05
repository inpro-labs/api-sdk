type OkResponse<T = any> = {
  success: true;
  statusCode: number;
  message?: undefined;
  data: T;
};

type ErrResponse = {
  success: false;
  statusCode: number;
  message: string;
  code?: string;
  data?: undefined;
};

/**
 * Union type for microservice responses,
 * either a success with data or an error with a message.
 *
 * @template T - The type of the success payload.
 */
export type MicroserviceResponse<T = Record<PropertyKey, unknown>> =
  | OkResponse<T>
  | ErrResponse;
