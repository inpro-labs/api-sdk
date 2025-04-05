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

export type MicroserviceResponse<T> = OkResponse<T> | ErrResponse;
