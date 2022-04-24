import {
  Animation,
  UpdateCurrent,
  UpdateColorDefault,
  UpdateHeight,
  UpdateColorSorted
} from '../../utils/model/animations';

let animations: Animation[];

/**
 * Generates an array of animations performing Merge Sort: divide the input in two halves, sorts and merges the results.
 * @param array - search space
 */
export function mergeSort(array: number[]): Animation[] {
  animations = [];
  sort(array);
  array.forEach((_, index) => {
    animations.push(new UpdateColorSorted(array.length - (index + 1)));
  });
  return animations;
}


function updateCurrentAndHeight(array: number[], first: number, current: number): void {
  animations.push(new UpdateCurrent(current, current + 1));
  animations.push(new UpdateHeight(first, array[current]));
}

/**
 * Merges two arrays.
 * @param leftArray
 * @param rightArray
 */
function merge(leftArray: number[], rightArray: number[]): number [] {
  let mergedArray: number[] = [], i = 0, j = 0;

  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] < rightArray[j]) {
      mergedArray.push(leftArray[i++]);
      updateCurrentAndHeight(leftArray, mergedArray.length - 1, i - 1);
    } else {
      mergedArray.push(rightArray[j++]);
      updateCurrentAndHeight(rightArray, mergedArray.length - 1, j - 1);
    }
  }
  while (i < leftArray.length) {
    mergedArray.push(leftArray[i++]);
    updateCurrentAndHeight(leftArray, mergedArray.length - 1, i - 1);
  }
  while (j < rightArray.length) {
    mergedArray.push(rightArray[j++]);
    updateCurrentAndHeight(rightArray, mergedArray.length - 1, j - 1);
  }
  animations.push(new UpdateColorDefault(j));

  return mergedArray;
}

/**
 * Sorts halves and merges them.
 * @param array - search space
 */
function sort(array: number []): number[] {
  if (array.length <= 1) return array;
  let mid = Math.floor(array.length / 2);
  let left: number [] = sort(array.slice(0, mid));
  let right: number [] = sort(array.slice(mid));
  return merge(left, right);
}
