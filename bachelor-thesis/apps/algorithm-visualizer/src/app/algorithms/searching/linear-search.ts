import { Animation, UpdateCurrent, UpdateColorFound } from '../../utils/model/animations';

/**
 * Start from the leftmost element of arr[] and one by one compare target with each element of the array
 * If target matches with an element, add the specific animation and stop iterating.
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 * @param offset
 */
export function linearSearch(array: number[], target: number, offset?: number): Animation[] {
  const animations: Animation[] = [];

  for (let i = 0; i < array.length; i++) {
    const current = i + (offset || 0);
    current === 0 ? animations.push(new UpdateCurrent(current, current)) :
      animations.push(new UpdateCurrent(current - 1, current));
    if (array[i] == target) {
      animations.push(new UpdateColorFound(current));
      break;
    }
  }

  return animations;
}
