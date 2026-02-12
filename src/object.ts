export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }
  return result;
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete (result as any)[key];
  }
  return result;
}

export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

export function mapValues<T, U>(obj: Record<string, T>, fn: (val: T) => U): Record<string, U> {
  const result: Record<string, U> = {};
  for (const [key, val] of Object.entries(obj)) {
    result[key] = fn(val);
  }
  return result;
}
