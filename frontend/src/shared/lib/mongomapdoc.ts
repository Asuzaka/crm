export function mapMongoDoc<T extends { _id: string }>(doc: T) {
  const { _id, ...rest } = doc;
  return { id: _id, ...rest };
}
