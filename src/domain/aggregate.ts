import { AggregateRoot } from "@nestjs/cqrs";
import { ID } from "./id";

/**
 * Base class for domain aggregates.
 *
 * Extends NestJS CQRS's `AggregateRoot` to support event sourcing and encapsulates
 * properties and behavior related to a domain aggregate's identity and state.
 *
 * @template T - The type of the aggregate's properties.
 */
export class Aggregate<T extends Record<any, any>> extends AggregateRoot {
  /** Internal properties of the aggregate, including its ID. */
  private _props: T & { id: ID };

  /**
   * Creates a new instance of the aggregate.
   *
   * @param props - The aggregate's properties, including an `id`.
   */
  constructor(props: T) {
    super();

    const id = ID.create(props.id as string).expect("Invalid ID");

    this._props = { ...props, id };
  }

  /**
   * Returns the aggregate's ID.
   *
   * @returns The `ID` instance of this aggregate.
   */
  get id(): ID {
    return this._props.id;
  }

  /**
   * Determines if the entity is new based on the ID.isNew() method.
   *
   * @returns `true` if the ID is considered new, otherwise `false`.
   */
  public isNew(): boolean {
    return this._props.id.isNew();
  }

  /**
   * Compares this aggregate to another based on identity (ID).
   *
   * @param aggregate - The aggregate to compare against.
   * @returns `true` if the aggregates are the same instance or share the same ID.
   */
  public equals(aggregate: Aggregate<T>): boolean {
    return aggregate === this || aggregate.id === this._props.id;
  }

  /**
   * Converts the aggregate's properties to a plain JavaScript object.
   *
   * @returns A shallow copy of the aggregate's properties.
   */
  public toObject(): T {
    return { ...this._props };
  }
}
