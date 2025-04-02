import { ID } from "./id";
import isEqual from "lodash.isequal";
import { SettersAndGetters } from "./setters-and-getters";
import { Adapter } from "./adapter";

/**
 * Base class for domain entities.
 *
 * Represents an object with a unique identity and encapsulates behavior
 * related to equality, persistence state, and data representation.
 *
 * @template Props - The entity's properties.
 */
export class Entity<T extends Record<any, any>> extends SettersAndGetters<T> {
  /** The ID of the entity. */
  private readonly _id: ID;

  /**
   * Creates a new instance of the entity.
   *
   * @param props - The entity's properties, including an `id`.
   * @throws If the provided ID is invalid.
   */
  constructor(props: T) {
    const id = ID.create(props.id as string).expect("Invalid ID");

    super({ ...props });

    this._id = id;
  }

  /**
   * Returns the entity's ID.
   *
   * @returns The entity's `ID` instance.
   */
  get id(): ID {
    return this._id;
  }

  /**
   * Determines if the entity is new based on the ID.isNew() method.
   *
   * @returns `true` if the ID is considered new, otherwise `false`.
   */
  public isNew(): boolean {
    return this._id.isNew();
  }

  /**
   * Compares this entity to another based on identity (ID).
   *
   * @param entity - The entity to compare against.
   * @returns `true` if the entities are the same instance or share the same ID.
   */
  public equals(entity: Entity<T>): boolean {
    return entity === this || entity.id === this._id;
  }

  /**
   * Performs a deep comparison of this entity's properties with another's.
   *
   * @param entity - The entity to deeply compare against.
   * @returns `true` if all properties are deeply equal.
   */
  public deepEquals(entity: Entity<T>): boolean {
    return entity === this || isEqual(entity._props, this._props);
  }

  /**
   * Converts the entity's properties to a plain JavaScript object.
   *
   * @param adapter - An optional adapter to transform the entity's properties.
   * @returns A shallow copy of the entity's properties.
   */
  public toObject<To = Omit<T, "id"> & { id: string }>(
    adapter?: Adapter<this, To>
  ): To {
    if (adapter && adapter.adaptOne) {
      return adapter.adaptOne(this);
    }

    return { ...this._props, id: this._id.value() } as To;
  }

  /**
   * Creates a deep clone of the entity.
   *
   * @returns A new instance of the entity with cloned properties.
   */
  public clone(): this {
    return new (this.constructor as new (props: T) => this)(this._props);
  }
}

const entity = new Entity({ id: "123", name: "John" });
