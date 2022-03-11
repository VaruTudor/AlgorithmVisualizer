import { AnimationTypes } from '../../utils/model/animation-types.enum';

/**
 * Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands.The
 * array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at
 * the correct position in the sorted part.
 * @param array - an array of numbers which is going to be sorted
 */
export function insertionSort(array: number[]): any[] {
  const animationsArray = [];
  for (let i = 1; i < array.length; ++i) {
    let arrayElementAtI = array[i];
    let j = i - 1;
    animationsArray.push([AnimationTypes.foundBetterMatch, i, j]);

    while (j >= 0 && array[j] > arrayElementAtI) {
      // mark the element at the current index during comparison
      animationsArray.push([AnimationTypes.newCurrent, j + 1, j]);
      animationsArray.push([AnimationTypes.height, j + 1, array[j]]);
      array[j + 1] = array[j--];
    }
    array[j + 1] = arrayElementAtI;
    animationsArray.push([AnimationTypes.default, j + 1, null]);
    animationsArray.push([AnimationTypes.height, j + 1, arrayElementAtI]);
  }
  // mark all elements in reverse order
  array.forEach((_, index) => {
    animationsArray.push([AnimationTypes.sorted, array.length - (index + 1), null]);
  });
  return animationsArray;
}
