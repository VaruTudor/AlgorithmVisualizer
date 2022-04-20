import {
  Animation,
  UpdateMatch,
  UpdateCurrent,
  UpdateColorDefault,
  UpdateColorFound
} from '../../utils/model/animations';
import { linearSearch } from './linear-search';

/**
 * The basic idea is to check fewer elements (than linear search) by jumping ahead by fixed steps or skipping some
 * elements in place of searching all elements. For example, suppose we have an array arr[] of size n and block (to be jumped)
 * size m. Then we search at the indexes arr[0], arr[m], arr[2m]…..arr[km] and so on. Once we find the interval
 * (arr[km] < x < arr[(k+1)m]), we perform a linear search operation from the index km to find the element x.
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function jumpSearch(array: number[], target: number): Animation[] {
  const animations: Animation[] = [];
  let offset = Math.floor(Math.sqrt(array.length)), current = 0, previous = current;

  while (array[Math.min(offset, array.length) - 1] < target) {
    animations.push(new UpdateMatch(offset + Math.floor(Math.sqrt(array.length)), offset));
    animations.push(new UpdateMatch(offset, current));
    current = offset;
    previous = current;
    offset += Math.floor(Math.sqrt(array.length));
    if (current >= array.length)
      return animations;
  }

  // Doing a linear search for x in block beginning with prev.
  animations.push(...linearSearch(array.slice(current, Math.min(offset, array.length)), target, current));
  return animations;
}
