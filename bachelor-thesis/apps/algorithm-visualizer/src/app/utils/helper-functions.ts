import { Animation } from './model/animations';
import { AnimationBasic } from './model/animations-basic';
import { Rectangle } from './model/shapes/rectangle';
import { Delays } from './model/delays';

export function executeAnimations(animations: Animation[], array: Rectangle[], delay: Delays){
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        animations[i].execute(array);
      }, i * delay);
  }
}
