import {
  Animation,
  UpdateMatch,
  UpdateCurrent,
  UpdateColorFound
} from '../../utils/model/animations';

/**
 * Binary Search repeatedly divides the sorted array in half. Knowing the array is sorted, time complexity is reduced
 * to O(Log n).
 * @param array - search space
 * @param target
 */
export function binarySearch(array: number[], target: number): Animation[] {
  return binarySearchHelper(array, target, 0, array.length - 1);
}

/**
 * Generates an array of animations by performing Binary Search.
 * @param array - search space
 * @param target
 * @param left
 * @param right
 */
export function binarySearchHelper(array: number[], target: number,
                                   left: number, right: number): Animation[] {
  const animations: Animation[] = [];
  let mid = left + Math.floor((right - left) / 2);

  animations.push(new UpdateMatch(left, left));
  animations.push(new UpdateMatch(right, right));
  while (right >= left) {
    mid === 0 ? animations.push(new UpdateCurrent(mid, mid))
      : animations.push(new UpdateCurrent(mid, left + Math.floor((right - left) / 2)));
    mid = left + Math.floor((right - left) / 2);

    if (array[mid] === target) {
      animations.push(new UpdateColorFound(mid));
      break;
    } else if (array[mid] > target) {
      animations.push(new UpdateMatch(mid - 1, right));
      right = mid - 1;
    } else {
      animations.push(new UpdateMatch(mid + 1, left));
      left = mid + 1;
    }
  }

  return animations;
}
