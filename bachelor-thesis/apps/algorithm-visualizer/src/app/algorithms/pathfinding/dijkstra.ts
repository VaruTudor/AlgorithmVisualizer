import { Node } from '../../utils/model/shapes';
import { Infinity } from '../../utils/computations';

export function dijkstra(grid: Node[][], startNode: Node, endNode: Node): Node[] {
  const visitedNodesInOrder: Node[] = [];
  startNode.updateDistance(0);
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode && !closestNode.isWall) {
      if (isTrapped(closestNode)) return visitedNodesInOrder;
      closestNode.markAsVisited();
      visitedNodesInOrder.push(closestNode);
      if (closestNode === endNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
  return visitedNodesInOrder;
}

function getAllNodes(grid: Node[][]) {
  const nodes: Node[] = [];
  for (const row of grid)
    for (const node of row)
      nodes.push(node);

  return nodes;
}

function sortNodesByDistance(unvisitedNodes: Node[]) {
  unvisitedNodes.sort((a: Node, b: Node) => a.distance - b.distance);
}

function isTrapped(node: Node) {
  return node.distance === Infinity;
}

function updateUnvisitedNeighbors(node: Node, grid: Node[][]) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  unvisitedNeighbors.forEach(neighbor => {
    neighbor.updateDistance(node.distance + 1);
    neighbor.updatePreviousNode(node);
  });
}

function getUnvisitedNeighbors(node: Node, grid: Node[][]) {
  const neighbors: Node[] = [], column = node.column, row = node.row;
  if (row > 0) neighbors.push(grid[row - 1][column]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][column]);
  if (column > 0) neighbors.push(grid[row][column - 1]);
  if (column < grid[0].length - 1) neighbors.push(grid[row][column + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}
