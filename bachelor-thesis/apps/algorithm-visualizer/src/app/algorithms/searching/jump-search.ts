import { BasicAnimation, BetterMatchFind, CurrentChange, DefaultMark, FoundMark } from '../../utils/model/animations';

/**
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function jumpSearch(array: number[], target: number): BasicAnimation[] {
  const animationsArray = [];
  // Finding block size to be jumped
  let step: number = Math.floor(Math.sqrt(array.length));

  // Finding the block where element is present (if it is present)
  let prev = 0, lastPrev = prev;
  while (array[Math.min(step, array.length) - 1] < target) {
    animationsArray.push(new BetterMatchFind(step + Math.floor(Math.sqrt(array.length)), step));
    animationsArray.push(new BetterMatchFind(step, prev));
    prev = step;
    lastPrev = prev;
    step += Math.floor(Math.sqrt(array.length));
    if (prev >= array.length)
      return animationsArray;
  }

  // Doing a linear search for x in block beginning with prev.
  prev === 0 ? animationsArray.push(new CurrentChange(prev, prev)) :
    animationsArray.push(new CurrentChange(prev - 1, prev));
  while (array[prev] < target) {
    prev++;
    animationsArray.push(new CurrentChange(prev - 1, prev));
    prev === lastPrev + 1 ? animationsArray.push(new BetterMatchFind(lastPrev, lastPrev))
      :animationsArray.push(new DefaultMark(prev - 1));


    // If we reached next block or end of array, element is
    // not present.
    if (prev == Math.min(step, array.length)) {
      return animationsArray;
    }
  }
  // If element is found
  if (array[prev] == target) {
    animationsArray.push(new CurrentChange(prev - 1, prev));
    animationsArray.push(new FoundMark(prev, 0));
  }

  return animationsArray;
}
