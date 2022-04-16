import { Animation, ColorChange } from './utils/animations';
import { Node } from '../../utils/model/shapes';
import { getNeighbors } from './utils/helper-functions';
import { Colors } from '../../utils/model/colors.enum';


export function dfs(grid: Node[][], startNode: Node, endNode: Node): Animation[] {
  const animationsArray: Animation[] = [];
  const frontier: Node[] = [startNode];

  while (frontier.length) {
    const currentNode = frontier.shift();
    if (currentNode && !currentNode.isWall) {
      currentNode.markAsVisited();
      if (!(currentNode.isStart || currentNode.isEnd))
        animationsArray.push(new ColorChange(currentNode, Colors.path));
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
