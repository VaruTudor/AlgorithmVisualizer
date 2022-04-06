import { BasicAnimation, BetterMatchAnimation, CurrentChangeAnimation, FoundAnimation } from '../../utils/model/animations';

/**
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function interpolationSearch(array: number[], target: number): BasicAnimation[] {
  const animationsArray = [];
  // Find indexes of two corners
  let current = -1, oldCurrent = -1;
  let low = 0, high = (array.length - 1);
  animationsArray.push(new BetterMatchAnimation(low, low));
  animationsArray.push(new BetterMatchAnimation(high, high));

  // Since array is sorted, an element present in array must be in range
  // defined by corner
  while (low <= high && target >= array[low] && target <= array[high])
  {
    if (low == high)
    {
      if (array[low] == target) {
        animationsArray.push(new FoundAnimation(low));
        return animationsArray;
      }
      break;
    }

    // Probing the position with keeping uniform distribution in mind.
    oldCurrent = current;
    current = low + Math.floor(((high - low) /
      (array[high] - array[low])) * (target - array[low]));
    if (oldCurrent !== -1 && current !== 0)
      animationsArray.push(new CurrentChangeAnimation(oldCurrent, current));
    else animationsArray.push(new CurrentChangeAnimation(current, current));

    // Condition of target found
    if (array[current] == target){
      animationsArray.push(new FoundAnimation(current));
      return animationsArray;
    }

    if (array[current] < target){
      animationsArray.push(new BetterMatchAnimation(current + 1, low));
      low = current + 1;
    }
    else{
      animationsArray.push(new BetterMatchAnimation(current -1, high));
      high = current - 1;
    }
  }

  return animationsArray;
}
