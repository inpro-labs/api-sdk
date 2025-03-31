export const createConstant = <T extends Record<string, unknown>>(
  value: T
): T & {
  values: string[];
  keys: string[];
} => {
  const freezedValue = Object.freeze(value);

  const values = Object.values(freezedValue);
  const keys = Object.keys(freezedValue);

  return {
    ...freezedValue,
    values,
    keys,
  };
};
