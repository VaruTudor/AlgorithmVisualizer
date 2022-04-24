import {
  Animation,
  UpdateMatch,
  UpdateCurrent,
  UpdateColorDefault,
  UpdateHeight,
  UpdateColorSorted
} from '../../utils/model/animations';

/**
 * Generates an array of animations performing Insertion Sort.
 * @param array - search space
 */
export function insertionSort(array: number[]): Animation[] {
  const animations: Animation[] = [];

  for (let i = 1; i < array.length; ++i) {
    let iTh = array[i], j = i - 1;

    animations.push(new UpdateMatch(i, j));
    while (j >= 0 && array[j] > iTh) {
      animations.push(new UpdateCurrent(j + 1, j));
      animations.push(new UpdateHeight(j + 1, array[j]));
      array[j + 1] = array[j--];
    }
    array[j + 1] = iTh;
    animations.push(new UpdateColorDefault(j + 1));
    animations.push(new UpdateHeight(j + 1, iTh));
  }
  array.forEach((_, index) => {
    animations.push(new UpdateColorSorted(array.length - (index + 1)));
  });

  return animations;
}
