import { MicroserviceResponse } from "@/contracts/microservice-response";

export class Response {
  static ok<T = any>(
    data: T,
    statusCode: number = 201
  ): MicroserviceResponse<T> {
    return { success: true, statusCode, data: data };
  }

  static err(
    message: string,
    code?: string,
    statusCode: number = 500
  ): MicroserviceResponse<{ message: string }> {
    return { success: false, statusCode, message, code };
  }
}
