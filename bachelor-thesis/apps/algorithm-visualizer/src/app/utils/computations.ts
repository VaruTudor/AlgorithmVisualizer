export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function swapArrayElements(array: any[], firstIndex: number, secondIndex: number): void {
  const firstElement = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = firstElement;
}
