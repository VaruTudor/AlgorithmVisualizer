import { AnimationBasic, UpdateColor } from '../../utils/model/animations-basic';
import { getNeighbors } from './utils/helper-functions';
import { Colors } from '../../utils/model/colors.enum';
import { GridElement } from '../../utils/model/shapes/grid-element';


export function dfs(grid: GridElement[][], startNode: GridElement, endNode: GridElement): AnimationBasic[] {
  const animationsArray: AnimationBasic[] = [];
  const frontier: GridElement[] = [startNode];

  while (frontier.length) {
    const currentNode = frontier.shift();
    if (currentNode && !currentNode.isWall) {
      currentNode.markAsVisited();
      if (!(currentNode.isStart || currentNode.isEnd))
        animationsArray.push(new UpdateColor(currentNode, Colors.path));
      if (currentNode === endNode) return animationsArray;
      getNeighbors(currentNode, grid).reverse().filter(neighbor => !neighbor.isVisited)
        .forEach(neighbor => {
          neighbor.updatePreviousNode(currentNode);
          frontier.unshift(neighbor);
          neighbor.markAsVisited();
        });
    }
  }

  return animationsArray;
}
