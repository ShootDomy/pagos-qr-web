export const isArrayAndNotEmpty = (value: unknown) => {
  return Array.isArray(value) && value.length > 0;
};
