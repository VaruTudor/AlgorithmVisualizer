import {
  Animation,
  BetterMatchAnimation,
  CurrentChangeAnimation,
  DefaultAnimation,
  FoundAnimation
} from '../../utils/model/animations';

/**
 * The basic idea is to check fewer elements (than linear search) by jumping ahead by fixed steps or skipping some
 * elements in place of searching all elements. For example, suppose we have an array arr[] of size n and block (to be jumped)
 * size m. Then we search at the indexes arr[0], arr[m], arr[2m]…..arr[km] and so on. Once we find the interval
 * (arr[km] < x < arr[(k+1)m]), we perform a linear search operation from the index km to find the element x.
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function jumpSearch(array: number[], target: number): Animation[] {
  const animations: Animation[] = [];
  let offset = Math.floor(Math.sqrt(array.length)), current = 0, previous = current;

  while (array[Math.min(offset, array.length) - 1] < target) {
    animations.push(new BetterMatchAnimation(offset + Math.floor(Math.sqrt(array.length)), offset));
    animations.push(new BetterMatchAnimation(offset, current));
    current = offset;
    previous = current;
    offset += Math.floor(Math.sqrt(array.length));
    if (current >= array.length)
      return animations;
  }
  // Doing a linear search for x in block beginning with prev.
  current === 0 ? animations.push(new CurrentChangeAnimation(current, current)) :
    animations.push(new CurrentChangeAnimation(current - 1, current));
  while (array[current] < target) {
    current++;
    animations.push(new CurrentChangeAnimation(current - 1, current));
    current === previous + 1 ? animations.push(new BetterMatchAnimation(previous, previous))
      : animations.push(new DefaultAnimation(current - 1));

    if (current == Math.min(offset, array.length)) return animations;
  }
  if (array[current] == target) {
    animations.push(new CurrentChangeAnimation(current - 1, current));
    animations.push(new FoundAnimation(current));
  }

  return animations;
}
