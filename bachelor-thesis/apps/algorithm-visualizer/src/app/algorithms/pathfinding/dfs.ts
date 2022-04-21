import { AnimationBasic, UpdateColor } from '../../utils/model/animations-basic';
import { getNeighbors } from './utils/helper-functions';
import { Colors } from '../../utils/model/colors.enum';
import { GridElement } from '../../utils/model/shapes/grid-element';


export function dfs(grid: GridElement[][], start: GridElement, end: GridElement): AnimationBasic[] {
  const animations: AnimationBasic[] = [];
  const frontier: GridElement[] = [start];

  while (frontier.length) {
    const current = frontier.shift();
    if (current && !current.isWall) {
      current.markAsVisited();
      if (!(current.isStart || current.isEnd))
        animations.push(new UpdateColor(current, Colors.path));
      if (current === end) return animations;
      getNeighbors(current, grid).reverse().filter(neighbor => !neighbor.isVisited)
        .forEach(neighbor => {
          neighbor.updatePreviousNode(current);
          frontier.unshift(neighbor);
          neighbor.markAsVisited();
        });
    }
  }

  return animations;
}
