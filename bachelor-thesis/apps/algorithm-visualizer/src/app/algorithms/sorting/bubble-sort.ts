import { AnimationTypes } from '../../utils/model/animation-types.enum';
import { swapArrayElements } from '../../utils/computations';

/**
 * Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in
 * wrong order. Also during the algorithm the steps are mapped in an array which will later be used to animate some
 * components.
 * @param array - an array of numbers which is going to be sorted
 */
export function bubbleSort(array: number[]): any[] {
  const animationsArray = [];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      // mark the element at the current index
      animationsArray.push([AnimationTypes.newCurrent, j, j + 1]);
      if (array[j] > array[j + 1]) {
        animationsArray.push([AnimationTypes.height, j, array[j + 1]]);
        animationsArray.push([AnimationTypes.height, j + 1, array[j]]);
        swapArrayElements(array, j, j + 1);
      }
    }
    // after each iteration, mark the (last-i)th element as sorted
    animationsArray.push([AnimationTypes.sorted, array.length - (i + 1), null]);
  }
  // mark the first element
  animationsArray.push([AnimationTypes.sorted, 0, null]);
  return animationsArray;
}
