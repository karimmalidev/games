export function createArray2D<T>(
  rows: number,
  cols: number,
  template: (r: number, c: number) => T,
): T[][] {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => template(r, c)),
  );
}
