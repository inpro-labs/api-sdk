/**
 * A wrapper to represent the result of an operation that can succeed or fail.
 *
 * This is a functional alternative to using `try/catch` blocks.
 *
 * @template T - The success value type.
 * @template E - The error type (extends Error).
 */
export class Result<T, E extends Error = Error> {
  #ok: T | null = null;
  #err: E | null = null;

  /**
   * Internal constructor. Use `Result.ok()` or `Result.err()` to instantiate.
   *
   * @param ok - The success value (if present).
   * @param err - The error value (if present).
   * @throws If both or neither of `ok` and `err` are provided.
   */
  constructor(ok: T | null, err: E | null) {
    if (!ok && !err) {
      throw new Error("Result must have a value or an error");
    }
    if (ok && err) {
      throw new Error("Result cannot have both a value and and error");
    }

    if (ok !== null) {
      this.#ok = ok;
    } else {
      this.#err = err;
    }
  }

  /**
   * Returns the success value or throws the error if it's an error result.
   *
   * @returns The success value.
   * @throws The error value if this result is an error.
   */
  unwrap(): T {
    if (this.isOk()) {
      return this.#ok as T;
    }

    if (this.isErr()) {
      throw this.#err as E;
    }

    throw new Error("Unknown error");
  }

  /**
   * Returns the success value or throws a custom error message if it's an error.
   *
   * @param msg - Custom message to throw if this is an error result.
   * @returns The success value.
   * @throws An error with the provided message if this is an error result.
   */
  expect(msg: string): T {
    if (this.isOk()) {
      return this.#ok as T;
    }

    if (this.isErr()) {
      throw new Error(msg);
    }

    throw new Error(msg);
  }

  /**
   * Checks whether this result is a success.
   *
   * @returns `true` if the result is OK.
   */
  isOk(): this is Result<T, never> {
    return this.#ok !== null;
  }

  /**
   * Checks whether this result is an error.
   *
   * @returns `true` if the result is an error.
   */
  isErr(): this is Result<never, E> {
    return this.#err !== null;
  }

  /**
   * Returns the error if present, otherwise `null`.
   *
   * @returns The error value or null.
   */
  getErr(): E | null {
    return this.#err;
  }

  /**
   * Creates a successful result.
   *
   * @param value - The success value.
   * @returns A `Result` representing success.
   */
  static ok<T>(value: T): Result<T> {
    return new Result(value, null);
  }

  /**
   * Creates an error result.
   *
   * @param error - The error value.
   * @returns A `Result` representing failure.
   */
  static err<E extends Error>(error: E): Result<never, E> {
    return new Result(null as never, error);
  }
}

/**
 * Helper function to create a successful result.
 *
 * @param value - The success value.
 * @returns A `Result` representing success.
 */
export function Ok<T>(value: T): Result<T> {
  return new Result(value, null);
}

/**
 * Helper function to create an error result.
 *
 * @param error - The error value.
 * @returns A `Result` representing failure.
 */
export function Err<E extends Error>(error: E): Result<never, E> {
  return new Result(null as never, error);
}
