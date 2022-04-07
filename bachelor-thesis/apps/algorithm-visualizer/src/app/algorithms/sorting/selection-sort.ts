import { swapArrayElements } from '../../utils/computations';
import {
  BasicAnimation,
  BetterMatchAnimation,
  CurrentChangeAnimation,
  DefaultAnimation,
  HeightAnimation,
  SortedAnimation
} from '../../utils/model/animations';

/**
 * The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order)
 * from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array. The
 * subarray which is already sorted and a remaining subarray which is unsorted. In every iteration of selection sort,
 * the minimum element (considering ascending order) from the unsorted subarray is picked and moved to the sorted
 * subarray. Also during the algorithm the steps are mapped in an array which will later be used to animate some
 * components.
 * @param array - array to be sorted
 */
export function selectionSort(array: any[]): BasicAnimation[] {
  const animationsArray: BasicAnimation[] = [];
  for (let i = 0; i < array.length - 1; i++) {
    let min = Number.MAX_SAFE_INTEGER;
    let indexOfMin = i;
    for (let j = indexOfMin; j < array.length; j++) {
      animationsArray.push(new CurrentChangeAnimation(j, j + 1));
      if (array[j] < min) {
        animationsArray.push(new BetterMatchAnimation(j, indexOfMin));
        min = array[j];
        indexOfMin = j;
      }
    }
    animationsArray.push(new HeightAnimation(i, min));
    animationsArray.push(new HeightAnimation(indexOfMin, array[i]));
    swapArrayElements(array, i, indexOfMin);
    animationsArray.push(new DefaultAnimation(indexOfMin));
    animationsArray.push(new SortedAnimation(i));
  }
  animationsArray.push(new SortedAnimation(array.length - 1));
  return animationsArray;
}
