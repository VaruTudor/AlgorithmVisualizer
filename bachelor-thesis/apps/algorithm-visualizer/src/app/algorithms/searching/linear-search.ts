import { Animation, UpdateCurrent, UpdateColorFound } from '../../utils/model/animations';

/**
 * Generates an array of animations by performing Linear Search.
 * @param array - search space
 * @param target
 * @param offset - added to all animations (useful if called from another search)
 */
export function linearSearch(array: number[], target: number, offset?: number): Animation[] {
  const animations: Animation[] = [];

  for (let i = 0; i < array.length; i++) {
    const current = i + (offset || 0);
    current === 0 ? animations.push(new UpdateCurrent(current, current)) :
      animations.push(new UpdateCurrent(current - 1, current));
    if (array[i] == target) {
      animations.push(new UpdateColorFound(current));
      break;
    }
  }

  return animations;
}
