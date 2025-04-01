import { AggregateRoot } from "@nestjs/cqrs";
import { ID } from "./id";

export class Aggregate<
  T extends Record<string, unknown>
> extends AggregateRoot {
  private _props: T & { id: ID };

  constructor(props: T) {
    super();

    const id = ID.create(props.id as string).expect("Invalid ID");

    this._props = { ...props, id };
  }

  get id(): ID {
    return this._props.id;
  }

  public equals(aggregate: Aggregate<T>): boolean {
    return aggregate === this || aggregate.id === this._props.id;
  }

  public toObject(): T {
    return { ...this._props };
  }
}
