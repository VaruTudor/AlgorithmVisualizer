export enum AlgorithmNames {
  binarySearch = 'Binary Search',
  exponentialSearch = 'Exponential Search',
  fibonacciSearch = 'Fibonacci Search',
  interpolationSearch = 'Interpolation Search',
  jumpSearch = 'Jump Search',
  linearSearch = 'Linear Search',
  bubbleSort = 'Bubble Sort',
  insertionSort = 'Insertion Sort',
  mergeSort = 'Merge Sort',
  selectionSort = 'Selection Sort',
  aStar = 'A*',
  bfs = 'BFS',
  dfs = 'DFS',
  dijkstra = 'Dijkstra'
}

export const Algorithms = {
  SEARCHING: [
    AlgorithmNames.binarySearch,
    AlgorithmNames.exponentialSearch,
    AlgorithmNames.fibonacciSearch,
    AlgorithmNames.interpolationSearch,
    AlgorithmNames.jumpSearch,
    AlgorithmNames.linearSearch
  ],

  SORTING: [
    AlgorithmNames.bubbleSort,
    AlgorithmNames.insertionSort,
    AlgorithmNames.mergeSort,
    AlgorithmNames.selectionSort
  ],

  PATHFINDING: [
    AlgorithmNames.aStar,
    AlgorithmNames.bfs,
    AlgorithmNames.dfs,
    AlgorithmNames.dijkstra
  ]
};

export enum AlgorithmSections {
  SORTING,
  SEARCHING,
  PATHFINDING
}
