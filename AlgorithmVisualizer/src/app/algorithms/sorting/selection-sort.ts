import {ChangeTypes} from '../../utils/change-types.enum';
import {swapArrayElements} from '../../utils/computations';

export function selectionSort(array): any[] {
  const animationsArray = [];
  for (let i = 0; i < array.length - 1; i++) {
    let min = Number.MAX_SAFE_INTEGER;
    let swapWithIndex = i + 1;
    for (let j = i + 1; j < array.length; j++) {
      animationsArray.push([ChangeTypes.newCurrent, j, j + 1]);
      if (array[j] < min) {
        animationsArray.push([ChangeTypes.foundBetterMatch, j, swapWithIndex]);
        min = array[j];
        swapWithIndex = j;
      }
    }
    animationsArray.push([ChangeTypes.height, i, array[swapWithIndex]]);
    animationsArray.push([ChangeTypes.height, swapWithIndex, array[i]]);
    swapArrayElements(array, i, swapWithIndex);
    animationsArray.push([ChangeTypes.sorted, i, null]);
  }
  return animationsArray;
}
