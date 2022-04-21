import { AnimationBasic, UpdateColor } from '../../../utils/model/animations-basic';
import { Colors } from '../../../utils/model/colors.enum';
import { GridElement } from '../../../utils/model/shapes/grid-element';

/**
 * Generates a list of nodes up-right-down-left (clockwise order) of the current node.
 * @param element
 * @param grid
 */
export function getNeighbors(element: GridElement, grid: GridElement[][]): GridElement[] {
  const neighbors: GridElement[] = [], column = element.column, row = element.row;
  if (row > 0) neighbors.push(grid[row - 1][column]);
  if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);
  if (column > 0) neighbors.push(grid[row][column - 1]);
  return neighbors;
}

export function getShortestPath(element: GridElement): AnimationBasic[] {
  const shortestPath: GridElement[] = [];
  let current = element;
  while (current != null) {
    if (!(current.isStart || current.isEnd))
      shortestPath.unshift(current);
    current = current.previousNode;
  }
  return shortestPath.map(node => new UpdateColor(node, Colors.shortestPath));
}

export function manhattanDistance(first: GridElement, second: GridElement): number {
  return Math.abs(first.row - second.row) + Math.abs(first.column - second.column);
}

export function sortByDistance(elements: GridElement[]) {
  elements.sort((a: GridElement, b: GridElement) => a.distance - b.distance);
}
