export const isArrayAndNotEmpty = (value: unknown) => {
  return Array.isArray(value) && value.length > 0;
};

export function redondear(number: number, decimalPlaces: number) {
  return (
    Math.ceil(number * Math.pow(10, decimalPlaces)) /
    Math.pow(10, decimalPlaces)
  );
}

export function redondearDecimales(num: number, decimalPlaces: number) {
  return (
    Math.round(redondear(num * Math.pow(10, decimalPlaces), decimalPlaces)) /
    Math.pow(10, decimalPlaces)
  );
}
