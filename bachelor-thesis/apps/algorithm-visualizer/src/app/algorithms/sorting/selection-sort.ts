import { swapArrayElements } from '../../utils/computations';
import { BetterMatchFind, CurrentChange, DefaultMark, HeightChange, SortedMark } from '../../utils/model/animations';

/**
 * The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order)
 * from unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a given array. The
 * subarray which is already sorted and a remaining subarray which is unsorted. In every iteration of selection sort,
 * the minimum element (considering ascending order) from the unsorted subarray is picked and moved to the sorted
 * subarray. Also during the algorithm the steps are mapped in an array which will later be used to animate some
 * components.
 * @param array - an array of numbers which is going to be sorted
 */
export function selectionSort(array: any[]): any[] {
  const animationsArray = [];
  for (let i = 0; i < array.length - 1; i++) {
    let min = Number.MAX_SAFE_INTEGER;
    let indexOfMin = i;
    for (let j = indexOfMin; j < array.length; j++) {
      animationsArray.push(new CurrentChange(j, j + 1));
      if (array[j] < min) {
        animationsArray.push(new BetterMatchFind(j, indexOfMin));
        min = array[j];
        indexOfMin = j;
      }
    }
    animationsArray.push(new HeightChange(i, min));
    animationsArray.push(new HeightChange(indexOfMin, array[i]));
    swapArrayElements(array, i, indexOfMin);
    // mark the previous indexOfMin back to default color
    animationsArray.push(new DefaultMark(indexOfMin));
    // mark the ith element as sorted
    animationsArray.push(new SortedMark(i, 0));
  }
  // mark the last element
  animationsArray.push(new SortedMark(array.length - 1, 0));
  return animationsArray;
}
