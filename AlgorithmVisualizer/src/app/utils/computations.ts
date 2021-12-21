export function getRandomInt(min, max): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function swapArrayElements(array, firstIndex, secondIndex): void {
  const firstElement = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = firstElement;
}
