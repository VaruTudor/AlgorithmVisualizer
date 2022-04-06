/**
 * Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands.The
 * array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at
 * the correct position in the sorted part.
 * @param array - an array of numbers which is going to be sorted
 */
import { BetterMatchFind, CurrentChange, DefaultMark, HeightChange, SortedMark } from '../../utils/model/animations';

export function insertionSort(array: number[]): any[] {
  const animationsArray = [];
  for (let i = 1; i < array.length; ++i) {
    let arrayElementAtI = array[i];
    let j = i - 1;
    animationsArray.push(new BetterMatchFind(i, j));

    while (j >= 0 && array[j] > arrayElementAtI) {
      // mark the element at the current index during comparison
      animationsArray.push(new CurrentChange(j + 1, j));
      animationsArray.push(new HeightChange(j + 1, array[j]));
      array[j + 1] = array[j--];
    }
    array[j + 1] = arrayElementAtI;
    animationsArray.push(new DefaultMark(j + 1));
    animationsArray.push(new HeightChange(j + 1, arrayElementAtI));
  }
  // mark all elements in reverse order
  array.forEach((_, index) => {
    animationsArray.push(new SortedMark(array.length - (index + 1)));
  });
  return animationsArray;
}
