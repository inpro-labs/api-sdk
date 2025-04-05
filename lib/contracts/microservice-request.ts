export interface MicroserviceRequest<T = any> {
  headers: Record<string, string>;
  body: T;
  params: Record<string, string>;
  query: Record<string, string>;
}
