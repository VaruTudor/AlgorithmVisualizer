import { BasicAnimation, CurrentChange, HeightChange, SortedMark } from '../../utils/model/animations';
import { swapArrayElements } from '../../utils/computations';

/**
 * Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in
 * wrong order. Also during the algorithm the steps are mapped in an array which will later be used to animate some
 * components.
 * @param array - an array of numbers which is going to be sorted
 */
export function bubbleSort(array: number[]): BasicAnimation[] {
  const animationsArray = [];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      // mark the element at the current index
      animationsArray.push(new CurrentChange(j, j + 1));
      if (array[j] > array[j + 1]) {
        animationsArray.push(new HeightChange(j, array[j + 1]));
        animationsArray.push(new HeightChange(j + 1, array[j]));
        swapArrayElements(array, j, j + 1);
      }
    }
    // after each iteration, mark the (last-i)th element as sorted
    animationsArray.push(new SortedMark(array.length - (i + 1), 0));
  }
  // mark the first element
  animationsArray.push(new SortedMark(0, 0));
  return animationsArray;
}
