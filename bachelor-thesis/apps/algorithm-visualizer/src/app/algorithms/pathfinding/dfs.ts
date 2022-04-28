import { AnimationBasic, UpdateColor } from '../../utils/model/animations-basic';
import { getNeighbors } from './utils/helper-functions';
import { Colors } from '../../utils/color/colors.enum';
import { GridElement } from '../../utils/model/shapes/grid-element';

/**
 * Generates an array of animations by performing Depth First Search search algorithm.
 * It maintains an information about paths originating at the start and extending those paths one step at a time. Step
 * order is ascending and calculated as sums the cost so far on the path and a heuristic.
 * @param grid - search space
 * @param start
 * @param end
 */
export function dfs(grid: GridElement[][], start: GridElement, end: GridElement): AnimationBasic[] {
  const animations: AnimationBasic[] = [], frontier: GridElement[] = [start];

  while (frontier.length) {
    const current = frontier.shift();
    if (current && !current.isWall) {
      current.markAsVisited();
      if (current === end) return animations;
      if (!current.isStart) animations.push(new UpdateColor(current, Colors.path));
      getNeighbors(current, grid).reverse().filter(neighbor => !neighbor.isVisited)
        .forEach(neighbor => updateState(frontier, current, neighbor));
    }
  }

  return animations;
}

/**
 * Chains neighbor to current and adds it to the beginning of the frontier.
 * @param frontier
 * @param current
 * @param neighbor
 */
function updateState(frontier: GridElement[], current: GridElement, neighbor: GridElement) {
  neighbor.markAsVisited();
  neighbor.updatePreviousNode(current);
  frontier.unshift(neighbor);
}
