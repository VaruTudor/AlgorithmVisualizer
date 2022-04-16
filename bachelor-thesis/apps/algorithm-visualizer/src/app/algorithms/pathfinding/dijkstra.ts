import { Node } from '../../utils/model/shapes';
import { Infinity } from '../../utils/computations';
import { Animation, ColorChange } from './utils/animations';
import { Colors } from '../../utils/model/colors.enum';
import { getNeighbors, sortNodesByDistance } from './utils/helper-functions';

export function dijkstra(grid: Node[][], startNode: Node, endNode: Node): Animation[] {
  const animationsArray: Animation[] = [];
  startNode.updateDistance(0);
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode && !closestNode.isWall) {
      if (isTrapped(closestNode)) return animationsArray;
      closestNode.markAsVisited();
      if (!(closestNode.isStart || closestNode.isEnd))
        animationsArray.push(new ColorChange(closestNode, Colors.path));
      if (closestNode === endNode) return animationsArray;
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
  return animationsArray;
}

function getAllNodes(grid: Node[][]) {
  const nodes: Node[] = [];
  for (const row of grid)
    for (const node of row)
      nodes.push(node);

  return nodes;
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
  return getNeighbors(node, grid).filter(neighbor => !neighbor.isVisited);
}
