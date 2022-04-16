import { Node } from '../../../utils/model/shapes';
import { Animation, ColorChange } from './animations';
import { Colors } from '../../../utils/model/colors.enum';

export function getNeighbors(node: Node, grid: Node[][]): Node[] {
  const neighbors: Node[] = [], column = node.column, row = node.row;
  if (row > 0) neighbors.push(grid[row - 1][column]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);
  if (column > 0) neighbors.push(grid[row][column - 1]);
  if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);
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
