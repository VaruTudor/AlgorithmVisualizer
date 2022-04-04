import { BasicAnimation, CurrentChange, FoundMark } from '../../utils/model/animations';

/**
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function linearSearch(array: number[], target: number): BasicAnimation[] {
  const animationsArray = [];
  let i;
  for (i = 0; i < array.length; i++){
    i === 0 ? animationsArray.push(new CurrentChange(i, i)) : animationsArray.push(new CurrentChange(i - 1, i));
    if (array[i] == target){
      animationsArray.push(new FoundMark(i, 0));
      break;
    }
  }
  return animationsArray;
}
