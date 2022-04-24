import {
  Animation,
  UpdateMatch,
  UpdateCurrent,
  UpdateColorFound
} from '../../utils/model/animations';
import { binarySearchHelper } from './binary-search';

/**
 * Generates an array of animations by performing Exponential Search: start with a subarray of size 1,
 * compare its last element with target, then double the size the last element smaller. After that, apply Binary Search
 * on last subarray which satisfied the condition.
 * @param array - search space
 * @param target
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
