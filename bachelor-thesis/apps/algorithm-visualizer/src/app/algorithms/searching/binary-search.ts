import {
  Animation,
  BetterMatchAnimation,
  CurrentChangeAnimation,
  FoundAnimation
} from '../../utils/model/animations';

/**
 * Binary Search is a searching algorithm used in a sorted array by repeatedly dividing the search interval in half.
 * The idea of binary search is to use the information that the array is sorted and reduce the time complexity to O(Log n)
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function binarySearch(array: number[], target: number): Animation[] {
  return binarySearchHelper(array, target, 0, array.length - 1);
}

/**
 * This function performs binary search given a left and a right as parameter. This is needed because other searches
 * also use this approach, but compute left and right in different ways.
 * @param array - the collection for the search
 * @param target - the element searched for
 * @param left - initial left boundary
 * @param right - initial right boundary
 */
export function binarySearchHelper(array: number[], target: number,
                                   left: number, right: number): Animation[] {
  const animations: Animation[] = [];
  let mid = left + Math.floor((right - left) / 2);

  animations.push(new BetterMatchAnimation(left, left));
  animations.push(new BetterMatchAnimation(right, right));
  while (right >= left) {
    mid === 0 ? animations.push(new CurrentChangeAnimation(mid, mid))
      : animations.push(new CurrentChangeAnimation(mid, left + Math.floor((right - left) / 2)));
    mid = left + Math.floor((right - left) / 2);

    if (array[mid] === target) {
      animations.push(new FoundAnimation(mid));
      break;
    } else if (array[mid] > target) {
      animations.push(new BetterMatchAnimation(mid - 1, right));
      right = mid - 1;
    } else {
      animations.push(new BetterMatchAnimation(mid + 1, left));
      left = mid + 1;
    }
  }

  return animations;
}
