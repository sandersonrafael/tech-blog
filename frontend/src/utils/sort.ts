export const sortLast = <T>(array: Array<T>, attribute: keyof T): T[] => {
  return array.sort((a: T, b: T) => (b[attribute] as number) - (a[attribute] as number));
};

export const sortOld = <T>(array: Array<T>, attribute: keyof T): T[] => {
  return array.sort((a: T, b: T) => (a[attribute] as number) - (b[attribute] as number));
};
