import isEqual from 'lodash.isequal';
import { SettersAndGetters } from './setters-and-getters';
import { Adapter } from './adapter';
import { serializeProps } from '../utils/serialize-props';
import { IdentifiablePlainify } from '@/utils/types';

/**
 * Base class for value objects in the domain layer.
 *
 * Value objects are defined solely by their properties. They are immutable
 * and do not have identity — two value objects with the same properties are considered equal.
 *
 * @template T - The shape of the value object's properties.
 */
export class ValueObject<
  T extends Record<any, any>,
> extends SettersAndGetters<T> {
  /**
   * Creates a new value object instance.
   *
   * @param props - The properties that define the value object.
   */
  constructor(props: T) {
    super(props);
  }

  /**
   * Returns the value object's properties.
   *
   * @returns The value object's properties.
   */
  get props(): T {
    return this._props;
  }

  /**
   * Compares this instance with another by reference.
   *
   * @param vo - The value object to compare with.
   * @returns `true` if both objects are the same instance.
   */
  public equals(vo: ValueObject<T>): boolean {
    return vo === this;
  }

  /**
   * Performs a deep equality check between two value objects.
   *
   * @param vo - The value object to compare with.
   * @returns `true` if both value objects have deeply equal properties.
   */
  public deepEquals(vo: ValueObject<T>): boolean {
    return isEqual(this._props, vo._props);
  }

  /**
   * Returns a shallow copy of the value object's properties.
   *
   * @param adapter - An optional adapter to transform the value object's properties.
   * @returns A plain object containing the value object's properties.
   */
  public toObject<To = IdentifiablePlainify<T>>(
    adapter?: Adapter<this, To>,
  ): To {
    if (adapter && adapter.adaptOne) {
      return adapter.adaptOne(this);
    }

    return serializeProps(this._props) as To;
  }

  /**
   * Creates a deep clone of the value object.
   *
   * @returns A new instance of the value object with cloned properties.
   */
  public clone(): this {
    return new (this.constructor as new (props: T) => this)(this._props);
  }
}
