import { AnimationBasic, UpdateColor } from '../../utils/model/animations-basic';
import { getNeighbors, manhattanDistance, sortNodesByDistance } from './utils/helper-functions';
import { Colors } from '../../utils/model/colors.enum';
import { STEP_COST } from './utils/constants';
import { GridElement } from '../../utils/model/shapes/grid-element';


export function aStar(grid: GridElement[][], startNode: GridElement, endNode: GridElement): AnimationBasic[] {
  const animationsArray: AnimationBasic[] = [];
  startNode.updateDistance(0);
  const frontier: GridElement[] = [startNode];

  while (frontier.length) {
    sortNodesByDistance(frontier);
    const currentNode = frontier.shift();
    if (currentNode && !currentNode.isWall) {
      currentNode.markAsVisited();
      if (currentNode === endNode) return animationsArray;
      if (!(currentNode.isStart || currentNode.isEnd))
        animationsArray.push(new UpdateColor(currentNode, Colors.path));
      getNeighbors(currentNode, grid).filter(neighbor => !neighbor.isVisited)
        .forEach(neighbor => {
          neighbor.markAsVisited();
          const newDistance = currentNode.distance + STEP_COST;
          if (newDistance < neighbor.distance) {
            neighbor.updateDistance(newDistance + manhattanDistance(neighbor, endNode));
            frontier.unshift(neighbor);
            neighbor.updatePreviousNode(currentNode);
          }
        });
    }
  }
  return animationsArray;
}
