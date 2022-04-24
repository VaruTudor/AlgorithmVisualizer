import { AnimationBasic, UpdateColor } from '../../../utils/model/animations-basic';
import { Colors } from '../../../utils/model/colors.enum';
import { GridElement } from '../../../utils/model/shapes/grid-element';

/**
 * Generates an array of neighbors up, right, down, left (clockwise order).
 * @param element - whose neighbors are to be generated
 * @param grid - search space
 */
export function getNeighbors(element: GridElement, grid: GridElement[][]): GridElement[] {
  const neighbors: GridElement[] = [], column = element.column, row = element.row;
  if (row > 0) neighbors.push(grid[row - 1][column]);
  if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);
  if (column > 0) neighbors.push(grid[row][column - 1]);
  return neighbors;
}

/**
 * Generates an array of animations representing the shortest path (iterating through previous until current has no
 * previous).
 * @param start
 */
export function getShortestPath(start: GridElement): AnimationBasic[] {
  const shortestPath: GridElement[] = [];
  let current = start;
  while (current != null) {
    if (!(current.isStart || current.isEnd))
      shortestPath.unshift(current);
    current = current.previousNode;
  }
  return shortestPath.map(node => new UpdateColor(node, Colors.shortestPath));
}

/**
 * Computes the Manhattan distance (the absolute sum between the difference of coordinates analogous).
 * @param start
 * @param end
 */
export function manhattanDistance(start: GridElement, end: GridElement): number {
  return Math.abs(start.row - end.row) + Math.abs(start.column - end.column);
}

/**
 * Sorts the array by the distance property.
 * @param elements - sorting space
 */
export function sortByDistance(elements: GridElement[]) {
  elements.sort((a: GridElement, b: GridElement) => a.distance - b.distance);
}
