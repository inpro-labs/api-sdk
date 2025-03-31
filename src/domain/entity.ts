import { deepEqual } from "../utils";
import { ID } from "./id";

export class Entity<T extends Record<string, unknown>> {
  private _props: T & { id: ID };

  constructor(props: T) {
    const id = ID.create(props.id as string).expect("Invalid ID");

    this._props = { ...props, id };
  }

  get props(): T {
    return this._props;
  }

  get id(): ID {
    return this._props.id;
  }

  public equals(entity: Entity<T>): boolean {
    return entity === this || entity.id === this._props.id;
  }

  public deepEquals(entity: Entity<T>): boolean {
    return entity === this || deepEqual(entity._props, this._props);
  }

  public toObject(): T {
    return { ...this._props };
  }
}
