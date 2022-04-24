import {
  Animation,
  UpdateMatch
} from '../../utils/model/animations';
import { linearSearch } from './linear-search';

/**
 * Generates an array of animations by performing Jump Search.
 * @param array - search space
 * @param target
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

  animations.push(...linearSearch(array.slice(current, Math.min(offset, array.length)), target, current));
  return animations;
}
