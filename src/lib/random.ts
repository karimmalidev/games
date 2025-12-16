export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randParam(
  scale: number,
  min: number,
  max: number,
  margin: number,
) {
  const x = Math.floor(
    min + (max - min) * scale * (1 + randFloat(-margin, margin)),
  );
  return Math.max(min, Math.min(max, x));
}

export function pick<T>(array: readonly T[]) {
  return array[randInt(0, array.length - 1)];
}

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function shuffle2D<T>(array2D: T[][]): T[][] {
  const flat = array2D.flat();
  shuffle(flat);
  let index = 0;
  for (let r = 0; r < array2D.length; r++) {
    for (let c = 0; c < array2D[r].length; c++) {
      array2D[r][c] = flat[index++];
    }
  }
  return array2D;
}
