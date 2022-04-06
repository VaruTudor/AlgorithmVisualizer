import {
  BasicAnimation,
  BetterMatchAnimation,
  CurrentChangeAnimation,
  DefaultAnimation,
  FoundAnimation
} from '../../utils/model/animations';

/**
 * The basic idea is to check fewer elements (than linear search) by jumping ahead by fixed steps or skipping some
 * elements in place of searching all elements. For example, suppose we have an array arr[] of size n and block (to be jumped)
 * size m. Then we search at the indexes arr[0], arr[m], arr[2m]…..arr[km] and so on. Once we find the interval
 * (arr[km] < x < arr[(k+1)m]), we perform a linear search operation from the index km to find the element x.
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function jumpSearch(array: number[], target: number): BasicAnimation[] {
  const animationsArray = [];

  let step = Math.floor(Math.sqrt(array.length)), prev = 0, lastPrev = prev;

  while (array[Math.min(step, array.length) - 1] < target) {
    animationsArray.push(new BetterMatchAnimation(step + Math.floor(Math.sqrt(array.length)), step));
    animationsArray.push(new BetterMatchAnimation(step, prev));
    prev = step;
    lastPrev = prev;
    step += Math.floor(Math.sqrt(array.length));
    if (prev >= array.length)
      return animationsArray;
  }

  // Doing a linear search for x in block beginning with prev.
  prev === 0 ? animationsArray.push(new CurrentChangeAnimation(prev, prev)) :
    animationsArray.push(new CurrentChangeAnimation(prev - 1, prev));
  while (array[prev] < target) {
    prev++;
    animationsArray.push(new CurrentChangeAnimation(prev - 1, prev));
    prev === lastPrev + 1 ? animationsArray.push(new BetterMatchAnimation(lastPrev, lastPrev))
      : animationsArray.push(new DefaultAnimation(prev - 1));

    if (prev == Math.min(step, array.length)) {
      return animationsArray;
    }
  }

  if (array[prev] == target) {
    animationsArray.push(new CurrentChangeAnimation(prev - 1, prev));
    animationsArray.push(new FoundAnimation(prev));
  }

  return animationsArray;
}
