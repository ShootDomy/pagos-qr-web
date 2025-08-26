export const isArrayAndNotEmpty = (value: unknown) => {
  return Array.isArray(value) && value.length > 0;
};

export const formatDigitos = (value: number, digitos: number = 2) => {
  return value.toLocaleString("es-EC", {
    minimumFractionDigits: digitos,
    maximumFractionDigits: digitos,
  });
};
