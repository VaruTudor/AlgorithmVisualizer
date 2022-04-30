import { AnimationBasic, UpdateColor } from '../../utils/model/animations-basic';
import { Colors } from '../../utils/theme/colors.enum';
import { getNeighbors, sortByDistance } from './utils/helper-functions';
import { GridElement } from '../../utils/model/shapes/grid-element';
import { INFINITY, STEP_COST } from '../../utils/constants';

/**
 * Generates an array of animations by performing Dijkstra path search algorithm.
 * @param grid - search space
 * @param start
 * @param end
 */
export function dijkstra(grid: GridElement[][], start: GridElement, end: GridElement): AnimationBasic[] {
  const animations: AnimationBasic[] = [], unvisitedElements = getGridElements(grid);
  start.updateDistance(0);

  while (unvisitedElements.length) {
    sortByDistance(unvisitedElements);
    const firstUnvisited = unvisitedElements.shift();
    if (firstUnvisited && !firstUnvisited.isWall) {
      firstUnvisited.markAsVisited();
      if (isTrapped(firstUnvisited)) return animations;
      if (firstUnvisited === end) return animations;
      if (!firstUnvisited.isStart) animations.push(new UpdateColor(firstUnvisited, Colors.path));
      updateUnvisitedNeighbors(grid, firstUnvisited);
    }
  }

  return animations;
}

/**
 * Updates the distance for each neighbor and chains it to current.
 * @param grid - search space
 * @param current
 */
function updateUnvisitedNeighbors(grid: GridElement[][], current: GridElement) {
  const unvisitedNeighbors = getUnvisitedNeighbors(current, grid);
  unvisitedNeighbors.forEach(neighbor => {
    neighbor.updateDistance(current.distance + STEP_COST);
    neighbor.updatePreviousNode(current);
  });
}

/**
 * Gets grid elements.
 * @param grid - search space
 */
function getGridElements(grid: GridElement[][]) {
  const elements: GridElement[] = [];
  for (const row of grid)
    for (const element of row)
      elements.push(element);

  return elements;
}

function isTrapped(element: GridElement) {
  return element.distance === INFINITY;
}

function getUnvisitedNeighbors(element: GridElement, grid: GridElement[][]) {
  return getNeighbors(element, grid).filter(neighbor => !neighbor.isVisited);
}
