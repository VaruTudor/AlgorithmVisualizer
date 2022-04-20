import { Animation, UpdateCurrent, UpdateColorFound } from '../../utils/model/animations';

/**
 * Start from the leftmost element of arr[] and one by one compare target with each element of the array
 * If target matches with an element, add the specific animation and stop iterating.
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function linearSearch(array: number[], target: number): Animation[] {
  const animations: Animation[] = [];

  for (let i = 0; i < array.length; i++) {
    i === 0 ? animations.push(new UpdateCurrent(i, i)) :
      animations.push(new UpdateCurrent(i - 1, i));
    if (array[i] == target) {
      animations.push(new UpdateColorFound(i));
      break;
    }
  }

  return animations;
}
