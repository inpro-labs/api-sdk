export class Result<T, E extends Error> {
  #ok: T | null = null;
  #err: E | null = null;

  protected constructor(ok: T | null, err: E | null) {
    if (!ok && !err) {
      throw new Error("Result must have a value or an error");
    }
    if (ok && err) {
      throw new Error("Result cannot have both a value and and error");
    }

    if (ok !== null) {
      this.#ok = ok;
    } else {
      this.#err = err as E;
    }
  }

  unwrap(): T {
    if (this.isOk()) {
      return this.#ok as T;
    }

    if (this.isErr()) {
      throw this.#err as E;
    }

    throw new Error("Unknown error");
  }

  expect(msg: string): T {
    if (this.isOk()) {
      return this.#ok as T;
    }

    if (this.isErr()) {
      const err = this.#err as E;

      throw new Error(msg + ":\n " + err.message);
    }

    throw new Error(msg);
  }

  isOk(): this is Result<T, never> {
    return this.#ok !== null;
  }

  isErr(): this is Result<never, E> {
    return this.#err !== null;
  }

  getErr(): this extends Result<never, E> ? E : E | null {
    return this.#err as E;
  }

  static ok<T>(value: T): Ok<T> {
    return new Ok(value);
  }

  static err<E extends Error>(error: E): Err<E> {
    return new Err(error);
  }
}

export class Ok<T> extends Result<T, never> {
  constructor(value: T) {
    super(value, null);
  }
}

export class Err<E extends Error> extends Result<never, E> {
  constructor(error: E) {
    super(null, error);
  }
}
