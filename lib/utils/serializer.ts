import { ID } from "../domain";

export function serializeProps(props: Record<any, any>): Record<any, any> {
  return Object.entries(props).reduce((acc, [key, value]) => {
    if (value instanceof ID) {
      acc[key] = value.value();
    } else if (typeof value?.toObject === "function") {
      acc[key] = value.toObject();
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as any);
}
