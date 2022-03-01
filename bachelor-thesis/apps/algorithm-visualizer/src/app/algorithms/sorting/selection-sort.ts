import {ChangeTypes} from '../../utils/change-types.enum';
import {swapArrayElements} from '../../utils/computations';

export function selectionSort(array: any[]): any[] {
  const animationsArray = [];
  for (let i = 0; i < array.length - 1; i++) {
    let min = Number.MAX_SAFE_INTEGER;
    // position where the right-side minimum will be held
    let swapWithIndex = i + 1;
    for (let j = i + 1; j < array.length; j++) {
      // mark the element at the current index
      animationsArray.push([ChangeTypes.newCurrent, j, j + 1]);
      if (array[j] < min) {
        // mark the new minimum
        animationsArray.push([ChangeTypes.foundBetterMatch, j, swapWithIndex]);
        min = array[j];
        swapWithIndex = j;
      }
    }
    // swap the elements and their heights
    animationsArray.push([ChangeTypes.height, i, array[swapWithIndex]]);
    animationsArray.push([ChangeTypes.height, swapWithIndex, array[i]]);
    swapArrayElements(array, i, swapWithIndex);
    // after each iteration, mark the ith element as sorted
    animationsArray.push([ChangeTypes.sorted, i, null]);
  }
  // mark the last element as it's not part of a comparison anymore
  animationsArray.push([ChangeTypes.sorted, array.length - 1, null]);
  return animationsArray;
}
