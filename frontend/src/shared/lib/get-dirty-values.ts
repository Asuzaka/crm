// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDirtyValues<T>(dirtyFields: any, allValues: T): Partial<T> {
  if (dirtyFields === true) {
    // field is dirty → return the whole value
    return allValues;
  }

  if (typeof dirtyFields !== "object" || dirtyFields === null) {
    return {};
  }

  const result = Object.fromEntries(
    Object.keys(dirtyFields).map((key) => [
      key,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getDirtyValues(dirtyFields[key], (allValues as any)[key]),
    ])
  );

  return result as Partial<T>;
}
