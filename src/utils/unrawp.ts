import { Result } from "types-ddd";

export const unwrapOrThrow = <T>(result: Result<T>, error?: Error) => {
  if (result.isFail()) {
    throw error || new Error(result.error());
  }

  return result.value();
};

export const unwrapOrThrowAsync = async <T>(result: Result<T>) => {
  if (result.isFail()) {
    throw new Error(result.error());
  }

  return result.value();
};
