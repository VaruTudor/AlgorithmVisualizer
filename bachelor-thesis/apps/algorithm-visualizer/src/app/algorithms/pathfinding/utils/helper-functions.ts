import { AnimationBasic, UpdateColor } from '../../../utils/model/animations-basic';
import { Colors } from '../../../utils/model/colors.enum';
import { GridElement } from '../../../utils/model/shapes/grid-element';

/**
 * Creates a list of nodes up-right-down-left (clockwise order) of the current node.
 * @param node
 * @param grid
 */
export function getNeighbors(node: GridElement, grid: GridElement[][]): GridElement[] {
  const neighbors: GridElement[] = [], column = node.column, row = node.row;
  if (row > 0) neighbors.push(grid[row - 1][column]);
  if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);
  if (column > 0) neighbors.push(grid[row][column - 1]);
  return neighbors;
}

export function getNodesInShortestPathOrder(finishNode: GridElement): AnimationBasic[] {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode != null) {
    if (!(currentNode.isStart || currentNode.isEnd))
      nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder.map(node => new UpdateColor(node, Colors.shortestPath));
}

export function manhattanDistance(first: GridElement, second: GridElement): number {
  return Math.abs(first.row - second.row) + Math.abs(first.column - second.column);
}

export function sortNodesByDistance(unvisitedNodes: GridElement[]) {
  unvisitedNodes.sort((a: GridElement, b: GridElement) => a.distance - b.distance);
}
