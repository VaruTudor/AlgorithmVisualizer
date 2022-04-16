import {
  Animation,
  BetterMatchAnimation,
  CurrentChangeAnimation,
  FoundAnimation
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
  const animationsArray: Animation[] = [];

  if (array[0] == target) {
    animationsArray.push(new FoundAnimation(0));
    return animationsArray;
  }

  let i = 1;
  while (i < array.length && array[i] <= target) {
    animationsArray.push(new CurrentChangeAnimation(i, i * 2));
    i = i * 2;
  }

  animationsArray.push(new BetterMatchAnimation(i, i / 2));
  animationsArray.push(...binarySearchHelper(array, target, i / 2, Math.min(i, array.length - 1)));
  return animationsArray;
}
