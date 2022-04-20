import { AnimationBasic, UpdateColor } from '../../utils/model/animations-basic';
import { Colors } from '../../utils/model/colors.enum';
import { getNeighbors, sortByDistance } from './utils/helper-functions';
import { GridElement } from '../../utils/model/shapes/grid-element';
import { INFINITY, STEP_COST } from '../../utils/constants';

export function dijkstra(grid: GridElement[][], start: GridElement, end: GridElement): AnimationBasic[] {
  const animations: AnimationBasic[] = [];
  start.updateDistance(0);
  const unvisitedElements = getGridElements(grid);

  while (unvisitedElements.length) {
    sortByDistance(unvisitedElements);
    const firstUnvisited = unvisitedElements.shift();
    if (firstUnvisited && !firstUnvisited.isWall) {
      if (isTrapped(firstUnvisited)) return animations;
      firstUnvisited.markAsVisited();
      if (!(firstUnvisited.isStart || firstUnvisited.isEnd))
        animations.push(new UpdateColor(firstUnvisited, Colors.path));
      if (firstUnvisited === end) return animations;
      updateUnvisitedNeighbors(firstUnvisited, grid);
    }
  }

  return animations;
}

function getGridElements(grid: GridElement[][]) {
  const nodes: GridElement[] = [];
  for (const row of grid)
    for (const node of row)
      nodes.push(node);

  return nodes;
}

function isTrapped(element: GridElement) {
  return element.distance === INFINITY;
}

function updateUnvisitedNeighbors(element: GridElement, grid: GridElement[][]) {
  const unvisitedNeighbors = getUnvisitedNeighbors(element, grid);
  unvisitedNeighbors.forEach(neighbor => {
    neighbor.updateDistance(element.distance + STEP_COST);
    neighbor.updatePreviousNode(element);
  });
}

function getUnvisitedNeighbors(element: GridElement, grid: GridElement[][]) {
  return getNeighbors(element, grid).filter(neighbor => !neighbor.isVisited);
}
