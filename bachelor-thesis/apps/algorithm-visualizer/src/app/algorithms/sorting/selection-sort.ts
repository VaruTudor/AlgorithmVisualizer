import { swapArrayElements } from '../../utils/computations';
import {
  Animation,
  UpdateMatch,
  UpdateCurrent,
  UpdateColorDefault,
  UpdateHeight,
  UpdateColorSorted
} from '../../utils/model/animations';

/**
 * Generates an array of animations performing Selection Sort: finding the minimum from the unsorted subarray, put it
 * at the beginning remove it from the unsorted subarray.
 * @param array - search space
 */
export function selectionSort(array: any[]): Animation[] {
  const animations: Animation[] = [];

  for (let i = 0; i < array.length - 1; i++) {
    let min = Number.MAX_SAFE_INTEGER, indexOfMin = i;
    for (let j = indexOfMin; j < array.length; j++) {
      animations.push(new UpdateCurrent(j, j + 1));
      if (array[j] < min) {
        animations.push(new UpdateMatch(j, indexOfMin));
        min = array[j];
        indexOfMin = j;
      }
    }
    animations.push(new UpdateHeight(i, min));
    animations.push(new UpdateHeight(indexOfMin, array[i]));
    swapArrayElements(array, i, indexOfMin);
    animations.push(new UpdateColorDefault(indexOfMin));
    animations.push(new UpdateColorSorted(i));
  }
  animations.push(new UpdateColorSorted(array.length - 1));

  return animations;
}
