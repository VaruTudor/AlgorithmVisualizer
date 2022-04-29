import { AnimationBasic, UpdateColor } from '../../utils/model/animations-basic';
import { getNeighbors, manhattanDistance, sortByDistance } from './utils/helper-functions';
import { Colors } from '../../utils/theme/colors.enum';
import { GridElement } from '../../utils/model/shapes/grid-element';
import { STEP_COST } from '../../utils/constants';

/**
 * Generates an array of animations by performing A* path search algorithm.
 * It maintains an information about paths originating at the start and extending those paths one step at a time. Step
 * order is ascending and calculated as sums the cost so far on the path and a heuristic.
 * @param grid - search space
 * @param start
 * @param end
 */
export function aStar(grid: GridElement[][], start: GridElement, end: GridElement): AnimationBasic[] {
  const animations: AnimationBasic[] = [], frontier: GridElement[] = [start];
  start.updateDistance(0);

  while (frontier.length) {
    sortByDistance(frontier);
    const current = frontier.shift();
    if (current && !current.isWall) {
      current.markAsVisited();
      if (current === end) return animations;
      if (!current.isStart) animations.push(new UpdateColor(current, Colors.path));
      getNeighbors(current, grid).filter(neighbor => !neighbor.isVisited)
        .forEach(neighbor => updateState(frontier, current, neighbor, end));
    }
  }

  return animations;
}

/**
 * Computes and updates the neighbor distance, marks it as visited and chains it to current. Also adds the neighbor to
 * the beginning of the frontier (depending of it's distance).
 * @param frontier -
 * @param current
 * @param neighbor
 * @param end
 */
function updateState(frontier: GridElement[], current: GridElement, neighbor: GridElement, end: GridElement) {
  neighbor.markAsVisited();
  const distance = current.distance + STEP_COST;
  if (distance < neighbor.distance) {
    neighbor.updateDistance(distance + manhattanDistance(neighbor, end));
    neighbor.updatePreviousNode(current);
    frontier.unshift(neighbor);
  }
}
