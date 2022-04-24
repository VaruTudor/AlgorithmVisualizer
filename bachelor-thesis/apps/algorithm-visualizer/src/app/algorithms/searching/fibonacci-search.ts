import {
  Animation,
  UpdateMatch,
  UpdateCurrent,
  UpdateColorDefault,
  UpdateColorFound
} from '../../utils/model/animations';

/**
 * Generates an array of animations by performing Fibonacci Search: find the smallest Fibonacci number greater or equal
 * than array size; let that number be fib (m’th Fibonacci number); We use (m-2)’th Fibonacci number as the index;
 * let (m-2)’th Fibonacci number be i, we compare arr[i] with x, if x is same, we return i; else if x is greater,
 * we recur for subarray after i, else we recur for subarray before i.
 * @param array - search space
 * @param target
 */
export function fibonacciSearch(array: number[], target: number): Animation[] {
  const animations: Animation[] = [];
  let fibonacciSmall = 0, fibonacciMiddle = 1, fibonacciBig = 1, offset = -1, i = 0;

  while (fibonacciBig < array.length) {
    fibonacciSmall = fibonacciMiddle;
    fibonacciMiddle = fibonacciBig;
    fibonacciBig = fibonacciSmall + fibonacciMiddle;
  }

  animations.push(new UpdateMatch(fibonacciSmall, fibonacciSmall));
  animations.push(new UpdateMatch(fibonacciMiddle, fibonacciMiddle));
  animations.push(new UpdateMatch(fibonacciBig, fibonacciBig));

  while (fibonacciBig > 1) {
    animations.push(new UpdateColorDefault(i));
    i = Math.min(offset + fibonacciSmall, array.length - 1);
    i === 0 ? animations.push(new UpdateCurrent(i, i)) :
      animations.push(new UpdateCurrent(i - 1, i));

    // If x is greater than the value at index fibonacciSmall, cut the subarray array from offset to i
    if (array[i] < target) {
      animations.push(new UpdateMatch(fibonacciMiddle - fibonacciSmall, fibonacciSmall));
      animations.push(new UpdateMatch(fibonacciSmall, fibonacciMiddle));
      animations.push(new UpdateMatch(fibonacciMiddle, fibonacciBig));
      fibonacciBig = fibonacciMiddle;
      fibonacciMiddle = fibonacciSmall;
      fibonacciSmall = fibonacciBig - fibonacciMiddle;
      offset = i;
    } else if (array[i] > target) {
      animations.push(new UpdateMatch(fibonacciSmall - (fibonacciMiddle - fibonacciSmall), fibonacciSmall));
      animations.push(new UpdateMatch(fibonacciMiddle - fibonacciSmall, fibonacciMiddle));
      animations.push(new UpdateMatch(fibonacciSmall, fibonacciBig));
      fibonacciBig = fibonacciSmall;
      fibonacciMiddle = fibonacciMiddle - fibonacciSmall;
      fibonacciSmall = fibonacciBig - fibonacciMiddle;
    } else {
      animations.push(new UpdateColorFound(i));
      break;
    }
  }
  if (fibonacciMiddle && array[array.length - 1] == target) {
    animations.push(new UpdateColorFound(array.length - 1));
  }

  return animations;
}
