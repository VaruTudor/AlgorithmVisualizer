import { BasicAnimation, BetterMatchFind, CurrentChange, DefaultMark, FoundMark } from '../../utils/model/animations';

/**
 * @param array - an array of numbers which is going to be searched
 * @param target - the number being searched for
 */
export function fibonacciSearch(array: number[], target: number): BasicAnimation[] {
  const animationsArray = [];
  /* Initialize fibonacci numbers */
  let fibonacciSmall = 0;
  let fibonacciMiddle = 1;
  let fibonacciBig = 1;

  /* fibonacciBig is going to store the smallest Fibonacci number greater than
   or equal to n */
  while (fibonacciBig < array.length) {
    fibonacciSmall = fibonacciMiddle;
    fibonacciMiddle = fibonacciBig;
    fibonacciBig = fibonacciSmall + fibonacciMiddle;
  }

  animationsArray.push(new BetterMatchFind(fibonacciSmall, fibonacciSmall));
  animationsArray.push(new BetterMatchFind(fibonacciMiddle, fibonacciMiddle));
  animationsArray.push(new BetterMatchFind(fibonacciBig, fibonacciBig));

  // Marks the eliminated range from front
  let offset = -1;
  let i = 0;

  while (fibonacciBig > 1) {
    // Check if fibMm2 is a valid location
    animationsArray.push(new DefaultMark(i))
    i = Math.min(offset + fibonacciSmall, array.length - 1);
    i === 0 ? animationsArray.push(new CurrentChange(i, i)) :
      animationsArray.push(new CurrentChange(i - 1, i));

    /* If x is greater than the value at index fibonacciSmall, cut the subarray
     array from offset to i */
    if (array[i] < target) {
      animationsArray.push(new BetterMatchFind(fibonacciMiddle - fibonacciSmall, fibonacciSmall));
      animationsArray.push(new BetterMatchFind(fibonacciSmall, fibonacciMiddle));
      animationsArray.push(new BetterMatchFind(fibonacciMiddle, fibonacciBig));
      fibonacciBig = fibonacciMiddle;
      fibonacciMiddle = fibonacciSmall;
      fibonacciSmall = fibonacciBig - fibonacciMiddle;
      offset = i;
    }

    /* If x is less than the value at index fibMm2,
    cut the subarray after i+1 */
    else if (array[i] > target) {
      animationsArray.push(new BetterMatchFind(fibonacciSmall - (fibonacciMiddle - fibonacciSmall), fibonacciSmall));
      animationsArray.push(new BetterMatchFind(fibonacciMiddle - fibonacciSmall, fibonacciMiddle));
      animationsArray.push(new BetterMatchFind(fibonacciSmall, fibonacciBig));
      fibonacciBig = fibonacciSmall;
      fibonacciMiddle = fibonacciMiddle - fibonacciSmall;
      fibonacciSmall = fibonacciBig - fibonacciMiddle;
    }

    /* element found. return index */
    else {
      animationsArray.push(new FoundMark(i));
      break;
    }
  }

  /* comparing the last element with x */
  if (fibonacciMiddle && array[array.length - 1] == target) {
    animationsArray.push(new FoundMark(array.length - 1));
  }

  return animationsArray;
}
