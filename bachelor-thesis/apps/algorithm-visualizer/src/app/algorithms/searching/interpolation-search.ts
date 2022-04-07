import {
  BasicAnimation,
  BetterMatchAnimation,
  CurrentChangeAnimation,
  FoundAnimation
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
export function interpolationSearch(array: number[], target: number): BasicAnimation[] {
  const animationsArray: BasicAnimation[] = [];
  let current = -1, previousCurrent = -1, low = 0, high = (array.length - 1);
  animationsArray.push(new BetterMatchAnimation(low, low));
  animationsArray.push(new BetterMatchAnimation(high, high));

  // Since array is sorted, an element present in array must be in range defined by corner
  while (low <= high && target >= array[low] && target <= array[high]) {
    if (low === high) {
      if (array[low] == target) {
        animationsArray.push(new FoundAnimation(low));
        return animationsArray;
      }
      break;
    }

    previousCurrent = current;
    current = low + Math.floor(((high - low) /
      (array[high] - array[low])) * (target - array[low]));
    if (previousCurrent !== -1 && current !== 0)
      animationsArray.push(new CurrentChangeAnimation(previousCurrent, current));
    else animationsArray.push(new CurrentChangeAnimation(current, current));

    if (array[current] == target) {
      animationsArray.push(new FoundAnimation(current));
      return animationsArray;
    } else if (array[current] < target) {
      animationsArray.push(new BetterMatchAnimation(current + 1, low));
      low = current + 1;
    } else {
      animationsArray.push(new BetterMatchAnimation(current - 1, high));
      high = current - 1;
    }
  }

  return animationsArray;
}
