export const sortDes = <T>(array: Array<T>, attribute: keyof T): T[] => {
  if (array.length > 0 && Array.isArray(array[0][attribute])) {
    return array.sort((a: T, b: T) => (b[attribute] as unknown[]).length - (a[attribute] as unknown[]).length);
  }

  if (array.length > 0 && (attribute === 'createdAt' || attribute === 'updatedAt')) {
    return array.sort((a: T, b: T) => new Date((b[attribute] as Date)).getTime() - new Date(a[attribute] as Date).getTime());
  }

  if (array.length > 0) {
    return array.sort((a: T, b: T) => (b[attribute] as number) - (a[attribute] as number));
  }

  return [];
};

export const sortAsc = <T>(array: Array<T>, attribute: keyof T): T[] => {
  if (array.length > 0 && Array.isArray(array[0][attribute])) {
    return array.sort((a: T, b: T) => (a[attribute] as unknown[]).length - (b[attribute] as unknown[]).length);
  }

  if (array.length > 0 && (attribute === 'createdAt' || attribute === 'updatedAt')) {
    return array.sort((a: T, b: T) => new Date(a[attribute] as Date).getTime() - new Date((b[attribute] as Date)).getTime());
  }

  if (array.length > 0) {
    return array.sort((a: T, b: T) => (a[attribute] as number) - (b[attribute] as number));
  }

  return [];
};

export const sortRandom = <T>(array: Array<T>) => {
  const newArray = [...array];

  for (let i = 0; i < newArray.length; i++) {
    const j: number = Math.round(Math.random() * (newArray.length - 1));

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return [...newArray];
};
