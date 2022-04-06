import { BasicAnimation, CurrentChangeAnimation, FoundAnimation } from '../../utils/model/animations';

/**
 * Start from the leftmost element of arr[] and one by one compare target with each element of the array
 * If target matches with an element, add the specific animation and stop iterating.
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function linearSearch(array: number[], target: number): BasicAnimation[] {
  const animationsArray = [];
  for (let i = 0; i < array.length; i++) {
    i === 0 ? animationsArray.push(new CurrentChangeAnimation(i, i)) :
      animationsArray.push(new CurrentChangeAnimation(i - 1, i));
    if (array[i] == target) {
      animationsArray.push(new FoundAnimation(i));
      break;
    }
  }
  return animationsArray;
}
