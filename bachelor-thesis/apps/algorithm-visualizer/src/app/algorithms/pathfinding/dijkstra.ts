import { Infinity } from '../../utils/computations';
import { AnimationBasic, UpdateColor } from '../../utils/model/animations-basic';
import { Colors } from '../../utils/model/colors.enum';
import { getNeighbors, sortNodesByDistance } from './utils/helper-functions';
import { GridElement } from '../../utils/model/shapes/grid-element';

export function dijkstra(grid: GridElement[][], startNode: GridElement, endNode: GridElement): AnimationBasic[] {
  const animationsArray: AnimationBasic[] = [];
  startNode.updateDistance(0);
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode && !closestNode.isWall) {
      if (isTrapped(closestNode)) return animationsArray;
      closestNode.markAsVisited();
      if (!(closestNode.isStart || closestNode.isEnd))
        animationsArray.push(new UpdateColor(closestNode, Colors.path));
      if (closestNode === endNode) return animationsArray;
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
  return animationsArray;
}

function getAllNodes(grid: GridElement[][]) {
  const nodes: GridElement[] = [];
  for (const row of grid)
    for (const node of row)
      nodes.push(node);

  return nodes;
}

function isTrapped(node: GridElement) {
  return node.distance === Infinity;
}

function updateUnvisitedNeighbors(node: GridElement, grid: GridElement[][]) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  unvisitedNeighbors.forEach(neighbor => {
    neighbor.updateDistance(node.distance + 1);
    neighbor.updatePreviousNode(node);
  });
}

function getUnvisitedNeighbors(node: GridElement, grid: GridElement[][]) {
  return getNeighbors(node, grid).filter(neighbor => !neighbor.isVisited);
}
