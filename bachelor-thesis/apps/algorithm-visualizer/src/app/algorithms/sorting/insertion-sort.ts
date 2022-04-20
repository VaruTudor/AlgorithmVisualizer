import {
  Animation,
  BetterMatchAnimation,
  CurrentChangeAnimation,
  DefaultAnimation,
  HeightAnimation,
  SortedAnimation
} from '../../utils/model/animations';

/**
 * Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands.The
 * array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at
 * the correct position in the sorted part.
 * @param array - array to be sorted
 */
export function insertionSort(array: number[]): Animation[] {
  const animationsArray: Animation[] = [];

  for (let i = 1; i < array.length; ++i) {
    let arrayElementAtI = array[i];
    let j = i - 1;

    animationsArray.push(new BetterMatchAnimation(i, j));
    while (j >= 0 && array[j] > arrayElementAtI) {
      animationsArray.push(new CurrentChangeAnimation(j + 1, j));
      animationsArray.push(new HeightAnimation(j + 1, array[j]));
      array[j + 1] = array[j--];
    }
    array[j + 1] = arrayElementAtI;
    animationsArray.push(new DefaultAnimation(j + 1));
    animationsArray.push(new HeightAnimation(j + 1, arrayElementAtI));
  }
  array.forEach((_, index) => {
    animationsArray.push(new SortedAnimation(array.length - (index + 1)));
  });

  return animationsArray;
}
