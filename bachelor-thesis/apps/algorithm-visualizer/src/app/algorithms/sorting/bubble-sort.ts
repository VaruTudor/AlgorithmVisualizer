import { Animation, UpdateCurrent, UpdateHeight, UpdateColorSorted } from '../../utils/model/animations';
import { swapArrayElements } from '../../utils/computations';

/**
 * Generates an array of animations performing Bubble Sort.
 * @param array - search space
 */
export function bubbleSort(array: number[]): Animation[] {
  const animations: Animation[] = [];

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      animations.push(new UpdateCurrent(j, j + 1));
      if (array[j] > array[j + 1]) {
        animations.push(new UpdateHeight(j, array[j + 1]));
        animations.push(new UpdateHeight(j + 1, array[j]));
        swapArrayElements(array, j, j + 1);
      }
    }
    animations.push(new UpdateColorSorted(array.length - (i + 1)));
  }
  animations.push(new UpdateColorSorted(0));

  return animations;
}
