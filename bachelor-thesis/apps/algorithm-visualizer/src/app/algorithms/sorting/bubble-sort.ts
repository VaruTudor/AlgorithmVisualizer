import { Animation, UpdateCurrent, UpdateHeight, UpdateColorSorted } from '../../utils/model/animations';
import { swapArrayElements } from '../../utils/computations';

/**
 * Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in
 * wrong order. Also during the algorithm the steps are mapped in an array which will later be used to animate some
 * components.
 * @param array - array to be sorted
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
