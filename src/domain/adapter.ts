export abstract class Adapter<From, To> {
  abstract adaptOne(from: From): To;
  abstract adaptMany(from: From[]): To[];
}
