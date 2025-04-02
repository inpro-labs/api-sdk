export function serializeProps(props: Record<any, any>): Record<any, any> {
  return Object.entries(props).reduce((acc, [key, value]) => {
    if (typeof value?.toObject === "function") {
      acc[key] = value.toObject();
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as any);
}
