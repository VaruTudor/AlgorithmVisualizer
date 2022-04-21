import { AnimationBasic, UpdateColor } from '../../utils/model/animations-basic';
import { getNeighbors, manhattanDistance, sortByDistance } from './utils/helper-functions';
import { Colors } from '../../utils/model/colors.enum';
import { GridElement } from '../../utils/model/shapes/grid-element';
import { STEP_COST } from '../../utils/constants';


export function aStar(grid: GridElement[][], start: GridElement, end: GridElement): AnimationBasic[] {
  const animations: AnimationBasic[] = [];
  start.updateDistance(0);
  const frontier: GridElement[] = [start];

  while (frontier.length) {
    sortByDistance(frontier);
    const current = frontier.shift();
    if (current && !current.isWall) {
      current.markAsVisited();
      if (current === end) return animations;
      if (!(current.isStart || current.isEnd))
        animations.push(new UpdateColor(current, Colors.path));
      getNeighbors(current, grid).filter(neighbor => !neighbor.isVisited)
        .forEach(neighbor => {
          neighbor.markAsVisited();
          const distance = current.distance + STEP_COST;
          if (distance < neighbor.distance) {
            neighbor.updateDistance(distance + manhattanDistance(neighbor, end));
            frontier.unshift(neighbor);
            neighbor.updatePreviousNode(current);
          }
        });
    }
  }

  return animations;
}
