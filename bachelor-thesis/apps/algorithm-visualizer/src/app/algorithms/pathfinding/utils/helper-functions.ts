import { Node } from '../../../utils/model/shapes';
import { Animation, ColorChange } from './animations';
import { Colors } from '../../../utils/model/colors.enum';

/**
 * Creates a list of nodes up-right-down-left (clockwise order) of the current node.
 * @param node
 * @param grid
 */
export function getNeighbors(node: Node, grid: Node[][]): Node[] {
  const neighbors: Node[] = [], column = node.column, row = node.row;
  if (row > 0) neighbors.push(grid[row - 1][column]);
  if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);
  if (column > 0) neighbors.push(grid[row][column - 1]);
  return neighbors;
}

export function getNodesInShortestPathOrder(finishNode: Node): Animation[] {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode != null) {
    if (!(currentNode.isStart || currentNode.isEnd))
      nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder.map(node => new ColorChange(node, Colors.shortestPath));
}
