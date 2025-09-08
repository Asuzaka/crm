export function filterout<T extends Object>(a:T, ...b: string[]):Partial<T>{
  for (const [key] of Object.entries(a)){
    if (b.includes(key)){
      delete (a as any)[key];
    }
  }
  return a;
}
