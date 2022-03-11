import { BasicAnimation, CurrentChange, HeightChange, SortedMark } from '../../utils/model/animations';

/**
 * Merge sort divides the input array into two halves, calls itself for the two halves, and then merges the two
 * sorted halves.
 * @param array - an array of numbers which is going to be sorted
 */

const animationsArray: BasicAnimation[] = [];

function merge(leftArray: number[], rightArray: number[]): number [] {
  let merged: number[] = [], i = 0, j = 0;
  while (i < leftArray.length && j < rightArray.length) {
    if (leftArray[i] < rightArray[j]) merged.push(leftArray[i++]);
    else merged.push(rightArray[j++]);
  }
  while (i < leftArray.length) merged.push(leftArray[i++]);
  while (j < rightArray.length) merged.push(rightArray[j++]);
  return merged;
}

function sort(array: number []): number[] {
  if (array.length <= 1) return array;
  let mid = Math.floor(array.length / 2);
  let left: number [] = sort(array.slice(0, mid));
  let right: number [] = sort(array.slice(mid));
  return merge(left, right);
}

export function mergeSort(array: number[]): BasicAnimation[] {
  console.log(sort(array));
  return animationsArray;
}
