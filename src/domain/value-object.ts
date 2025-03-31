import { deepEqual } from "../utils";

export class ValueObject<T extends Record<string, unknown>> {
  private _props: T;

  constructor(props: T) {
    this._props = props;
  }

  get props(): T {
    return this._props;
  }

  public equals(vo: ValueObject<T>): boolean {
    return vo === this || deepEqual(vo._props, this._props);
  }

  public toObject(): T {
    return { ...this._props };
  }
}
