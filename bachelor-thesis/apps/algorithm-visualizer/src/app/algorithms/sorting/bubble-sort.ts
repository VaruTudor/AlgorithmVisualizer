import {ChangeTypes} from '../../utils/change-types.enum';
import {swapArrayElements} from '../../utils/computations';

export function bubbleSort(array: any[]): any[] {
  const animationsArray = [];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      // mark the element at the current index
      animationsArray.push([ChangeTypes.newCurrent, j, j + 1]);
      if (array[j] > array[j + 1]) {
        // swap the elements and their heights
        animationsArray.push([ChangeTypes.height, j, array[j + 1]]);
        animationsArray.push([ChangeTypes.height, j + 1, array[j]]);
        swapArrayElements(array, j, j + 1);
      }
    }
    // after each iteration, the last i elements are sorted and want to mark the
    // newly added one as sorted
    animationsArray.push([ChangeTypes.sorted, array.length - (i + 1), null]);
  }
  // mark the first element as it's not part of a comparison anymore
  animationsArray.push([ChangeTypes.sorted, 0, null]);
  return animationsArray;
}
