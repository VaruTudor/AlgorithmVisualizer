import {
  Animation,
  UpdateMatch,
  UpdateCurrent,
  UpdateColorFound
} from '../../utils/model/animations';

/**
 * Generates an array of animations by performing Interpolation Search
 * @param array - space search
 * @param target
 */
export function interpolationSearch(array: number[], target: number): Animation[] {
  const animations: Animation[] = [];
  let current = -1, previous = -1, left = 0, right = (array.length - 1);

  animations.push(new UpdateMatch(left, left));
  animations.push(new UpdateMatch(right, right));

  while (left <= right && target >= array[left] && target <= array[right]) {
    if (left === right) {
      if (array[left] === target) {
        animations.push(new UpdateColorFound(left));
        return animations;
      }
      break;
    }

    previous = current;
    current = left + Math.floor(((right - left) / (array[right] - array[left])) * (target - array[left]));
    if (previous !== -1 && current !== 0) animations.push(new UpdateCurrent(previous, current));
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
