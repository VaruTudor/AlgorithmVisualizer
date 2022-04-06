import { BasicAnimation, BetterMatchFind, CurrentChange, FoundMark } from '../../utils/model/animations';
import { binarySearchHelper } from './binary-search';

/**
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function exponentialSearch(array: number[], target: number): BasicAnimation[] {
  const animationsArray: BasicAnimation[] = [];
  // If x is present at first location itself
  if (array[0] == target) {
    animationsArray.push(new FoundMark(0, 0));
    return animationsArray;
  }

  // Find range for binary search by repeated doubling
  let i = 1;
  while (i < array.length && array[i] <= target) {
    animationsArray.push(new CurrentChange(i, i * 2));
    i = i * 2;
  }

  animationsArray.push(new BetterMatchFind(i, i / 2));

  let left = i / 2,
    right = Math.min(i, array.length - 1);

  animationsArray.push(...binarySearchHelper(array, target, left, right));
  return animationsArray;
}
