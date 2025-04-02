import { Adapter } from "./adapter";
import { Entity } from "./entity";
import { ID } from "./id";
import { ValueObject } from "./value-object";

class TestEntity extends Entity<{
  id: ID;
  name: string;
  value: ValueObject<{ teste: string }>;
}> {
  constructor(props: {
    id: ID;
    name: string;
    value: ValueObject<{ teste: string }>;
  }) {
    super(props);
  }
}

class TestEntityAdapter
  implements Adapter<TestEntity, { adaptedValue: string }>
{
  adaptOne(entity: TestEntity): { adaptedValue: string } {
    return { adaptedValue: entity.id.value() };
  }
}

describe("Entity", () => {
  it("should create an entity", () => {
    const entity = new TestEntity({
      id: ID.create("1").unwrap(),
      name: "John Doe",
      value: new ValueObject({ teste: "John Doe" }),
    });

    expect(entity).toBeDefined();
  });

  it("should transform to object", () => {
    const value = new ValueObject({ teste: "John Doe" });

    const entity = new TestEntity({
      id: ID.create("1").unwrap(),
      name: "John Doe",
      value,
    });

    const obj = entity.toObject();

    expect(obj).toEqual({
      id: "1",
      name: "John Doe",
      value: { teste: "John Doe" },
    });
  });

  it("should transform to object with adapter", () => {
    const value = new ValueObject({ teste: "John Doe" });

    const entity = new TestEntity({
      id: ID.create("1").unwrap(),
      name: "John Doe",
      value,
    });

    const adapter = new TestEntityAdapter();

    const obj = entity.toObject(adapter);

    expect(obj).toEqual({
      adaptedValue: "1",
    });
  });
});
