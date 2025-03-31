import { Result } from "../core";

export class ID {
  private _isNew = false;
  private _value: string;

  private constructor(value?: string) {
    if (value) {
      this._isNew = false;
      this._value = value;
    } else {
      this._isNew = true;
      this._value = crypto.randomUUID();
    }
  }

  static create(id?: string): Result<ID, Error> {
    return Result.ok(new ID(id));
  }

  public equals(id: ID): boolean {
    return this.value === id.value;
  }

  public value(): string {
    return this._value;
  }

  public isNew(): boolean {
    return this._isNew;
  }
}
