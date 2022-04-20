import {
  Animation,
  UpdateMatch,
  UpdateCurrent,
  UpdateColorFound
} from '../../utils/model/animations';

/**
 * The Interpolation Search is an improvement over Binary Search for instances, where the values in a sorted array are
 * uniformly distributed. Binary Search always goes to the middle element to check. On the other hand,
 * interpolation search may go to different locations according to the value of the key being searched.
 * For example, if the value of the key is closer to the last element, interpolation search is likely to start search
 * toward the end side.
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function interpolationSearch(array: number[], target: number): Animation[] {
  const animations: Animation[] = [];
  let current = -1, previous = -1, left = 0, right = (array.length - 1);

  animations.push(new UpdateMatch(left, left));
  animations.push(new UpdateMatch(right, right));
  // Since array is sorted, an element present in array must be in range defined by corner
  while (left <= right && target >= array[left] && target <= array[right]) {
    if (left === right) {
      if (array[left] === target) {
        animations.push(new UpdateColorFound(left));
        return animations;
      }
      break;
    }
    previous = current;
    current = left + Math.floor(((right - left) /
      (array[right] - array[left])) * (target - array[left]));
    if (previous !== -1 && current !== 0)
      animations.push(new UpdateCurrent(previous, current));
    else animations.push(new UpdateCurrent(current, current));
    if (array[current] == target) {
      animations.push(new UpdateColorFound(current));
      return animations;
    } else if (array[current] < target) {
      animations.push(new UpdateMatch(current + 1, left));
      left = current + 1;
    } else {
      animations.push(new UpdateMatch(current - 1, right));
      right = current - 1;
    }
  }

  return animations;
}
