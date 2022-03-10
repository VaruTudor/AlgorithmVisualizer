import {AnimationTypes} from '../../utils/model/animation-types.enum';
import {swapArrayElements} from '../../utils/computations';

/**
 * The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order)
 * from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array.
 * The subarray which is already sorted and a remaining subarray which is unsorted.
 * In every iteration of selection sort, the minimum element (considering ascending order) from the unsorted subarray
 * is picked and moved to the sorted subarray. Also during the algorithm the steps are mapped in an array which will
 * later be used to animate some components.
 * @param array - an array of numbers which is going to be sorted
 */
export function selectionSort(array: any[]): any[] {
  const animationsArray = [];
  for (let i = 0; i < array.length - 1; i++) {
    let min = Number.MAX_SAFE_INTEGER;
    let indexOfMin = i;
    for (let j = indexOfMin; j < array.length; j++) {
      animationsArray.push([AnimationTypes.newCurrent, j, j + 1]);
      if (array[j] < min) {
        animationsArray.push([AnimationTypes.foundBetterMatch, j, indexOfMin]);
        min = array[j];
        indexOfMin = j;
      }
    }
    animationsArray.push([AnimationTypes.height, i, min]);
    animationsArray.push([AnimationTypes.height, indexOfMin, array[i]]);
    swapArrayElements(array, i, indexOfMin);
    // mark the previous indexOfMin back to default color
    animationsArray.push([AnimationTypes.default, indexOfMin, null]);
    // mark the ith element as sorted
    animationsArray.push([AnimationTypes.sorted, i, null]);
  }
  // mark the last element
  animationsArray.push([AnimationTypes.sorted, array.length - 1, null]);
  return animationsArray;
}
