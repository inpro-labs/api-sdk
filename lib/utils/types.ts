import { Entity } from "../domain/entity";
import { ValueObject } from "../domain/value-object";

export type Plainify<T> = {
  [K in keyof T]: T[K] extends ValueObject<infer V>
    ? Plainify<V>
    : T[K] extends Entity<infer V>
    ? Plainify<V> & { id: string }
    : T[K] extends Record<any, any>
    ? Plainify<T[K]>
    : T[K];
};

export type IdentifiablePlainify<T> = Plainify<Omit<T, "id">> & { id: string };
