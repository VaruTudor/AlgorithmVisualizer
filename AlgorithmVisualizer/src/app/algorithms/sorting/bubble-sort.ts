import {ChangeTypes} from '../../utils/change-types.enum';
import {swapArrayElements} from '../../utils/computations';

export function bubbleSort(array): any[] {
  const animationsArray = [];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      animationsArray.push([ChangeTypes.newCurrent, j, j + 1]);
      if (array[j] > array[j + 1]) {
        animationsArray.push([ChangeTypes.height, j, array[j + 1]]);
        animationsArray.push([ChangeTypes.height, j + 1, array[j]]);
        swapArrayElements(array, j, j + 1);
      }
      animationsArray.push([ChangeTypes.sorted, array.length - (i + 1), null]);
    }
  }
  return animationsArray;
}
