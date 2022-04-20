import {
  Animation,
  UpdateMatch,
  UpdateCurrent,
  UpdateColorFound
} from '../../utils/model/animations';
import { binarySearchHelper } from './binary-search';

/**
 * The idea is to start with subarray size 1, compare its last element with x, then try size 2, then 4 and so on until
 * last element of a subarray is not greater. Once we find an index i (after repeated doubling of i),
 * we know that the element must be present between i/2 and i. After finding the range, we apply binary search within it
 * to find the target
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function exponentialSearch(array: number[], target: number): Animation[] {
  const animations: Animation[] = [];
  let i = 1;

  if (array[0] == target) {
    animations.push(new UpdateColorFound(0));
    return animations;
  }
  while (i < array.length && array[i] <= target) {
    animations.push(new UpdateCurrent(i, i * 2));
    i = i * 2;
  }
  animations.push(new UpdateMatch(i, i / 2));
  animations.push(...binarySearchHelper(array, target, i / 2, Math.min(i, array.length - 1)));

  return animations;
}
