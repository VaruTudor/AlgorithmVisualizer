import {
  BasicAnimation,
  CurrentChange,
  DefaultMark,
  HeightChange,
  SortedMark
} from '../../utils/model/animations';

/**
 * Merge sort divides the input array into two halves, calls itself for the two halves, and then merges the two
 * sorted halves.
 * @param array - an array of numbers which is going to be sorted
 */

let animationsArray: BasicAnimation[];

function pushMergeSortAnimation(array: number[], first: number, current: number): void {
  animationsArray.push(new CurrentChange(current, current + 1));
  animationsArray.push(new HeightChange(first, array[current]));
}

function merge(leftArray: number[], rightArray: number[]): number [] {
  let mergedArray: number[] = [], i = 0, j = 0;
  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] < rightArray[j]) {
      mergedArray.push(leftArray[i++]);
      pushMergeSortAnimation(leftArray, mergedArray.length - 1, i - 1);
    } else {
      mergedArray.push(rightArray[j++]);
      pushMergeSortAnimation(rightArray, mergedArray.length - 1, j - 1);
    }
  }
  while (i < leftArray.length) {
    mergedArray.push(leftArray[i++]);
    pushMergeSortAnimation(leftArray, mergedArray.length - 1, i - 1);
  }
  while (j < rightArray.length) {
    mergedArray.push(rightArray[j++]);
    pushMergeSortAnimation(rightArray, mergedArray.length - 1, j - 1);
  }
  animationsArray.push(new DefaultMark(j, 0));
  return mergedArray;
}

function sort(array: number []): number[] {
  if (array.length <= 1) return array;
  let mid = Math.floor(array.length / 2);
  let left: number [] = sort(array.slice(0, mid));
  let right: number [] = sort(array.slice(mid));
  return merge(left, right);
}

export function mergeSort(array: number[]): BasicAnimation[] {
  animationsArray = [];
  sort(array);
  // mark all elements in reverse order
  array.forEach((_, index) => {
    animationsArray.push(new SortedMark(array.length - (index + 1), 0));
  });
  return animationsArray;
}
