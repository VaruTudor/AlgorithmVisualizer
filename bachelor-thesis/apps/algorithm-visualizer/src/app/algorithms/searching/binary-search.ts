import { BasicAnimation, BetterMatchFind, CurrentChange, DefaultMark, FoundMark } from '../../utils/model/animations';

/**
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function binarySearch(array: number[], target: number): BasicAnimation[] {

  let left = 0, right = array.length - 1;

  return binarySearchHelper(array, target, left, right);
}

export function binarySearchHelper(array: number[], target: number,
                                   left: number, right: number): BasicAnimation[] {
  const animationsArray = [];
  animationsArray.push(new BetterMatchFind(left, left));
  animationsArray.push(new BetterMatchFind(right, right));

  let mid = left + Math.floor((right - left) / 2);
  while (right >= left) {
    animationsArray.push(new DefaultMark(mid));
    mid = left + Math.floor((right - left) / 2);
    mid === 0 ? animationsArray.push(new CurrentChange(mid, mid)) :
      animationsArray.push(new CurrentChange(mid - 1, mid));


    // If the element is present at the middle itself
    if (array[mid] == target) {
      animationsArray.push(new FoundMark(mid));
      break;
    }

    // If element is smaller than mid, then it can only be present in
    // left subarray
    if (array[mid] > target) {
      animationsArray.push(new BetterMatchFind(mid - 1, right));
      right = mid - 1;
    }

    // Else the element can only be present in right subarray
    else {
      animationsArray.push(new BetterMatchFind(mid + 1, left));
      left = mid + 1;
    }
  }

  return animationsArray;
}
