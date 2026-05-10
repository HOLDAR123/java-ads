// =============================================================================
// Laboratory Work #11 – Graph Algorithms
// =============================================================================

// =============================================================================
// Task 1 – Cheapest Flights Within K Stops
// https://leetcode.com/problems/cheapest-flights-within-k-stops/
//
// Modified Dijkstra with a min-heap priority queue.
// State: (price, city, stopsUsed). Stops used must be <= k.
// =============================================================================

class MinHeap {
  constructor() { this.heap = []; }

  push(item) {
    this.heap.push(item);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._sinkDown(0);
    }
    return top;
  }

  get size() { return this.heap.length; }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.heap[parent][0] > this.heap[i][0]) {
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
        i = parent;
      } else break;
    }
  }

  _sinkDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.heap[l][0] < this.heap[smallest][0]) smallest = l;
      if (r < n && this.heap[r][0] < this.heap[smallest][0]) smallest = r;
      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }
}

function findCheapestPrice(n, flights, src, dst, k) {
  // Build adjacency list: city → [[price, dest], ...]
  const graph = {};
  for (const [from, to, price] of flights) {
    if (!graph[from]) graph[from] = [];
    graph[from].push([price, to]);
  }

  // Min-heap: [price, city, stops]
  const pq = new MinHeap();
  pq.push([0, src, 0]);

  // Best known stops count to reach a city — allows revisiting with fewer stops
  const bestStops = {};

  while (pq.size > 0) {
    const [price, city, stops] = pq.pop();

    if (city === dst) return price;
    if (stops > k) continue;

    // Prune: if we already reached this city with fewer or equal stops, skip
    if (bestStops[city] !== undefined && bestStops[city] <= stops) continue;
    bestStops[city] = stops;

    for (const [edgePrice, next] of (graph[city] || [])) {
      pq.push([price + edgePrice, next, stops + 1]);
    }
  }

  return -1;
}

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║               Laboratory Work #11 – Graph Algorithms         ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

console.log('=== Task 1: Cheapest Flights Within K Stops ===');

const flights1 = [[0,1,100],[1,2,100],[0,2,500]];
console.log('flights =', JSON.stringify(flights1));
console.log('src=0, dst=2, k=1 →', findCheapestPrice(3, flights1, 0, 2, 1)); // 200
console.log('src=0, dst=2, k=0 →', findCheapestPrice(3, flights1, 0, 2, 0)); // 500

const flights2 = [[0,1,100],[1,2,100],[2,3,100],[0,3,600]];
console.log('\nflights =', JSON.stringify(flights2));
console.log('src=0, dst=3, k=2 →', findCheapestPrice(4, flights2, 0, 3, 2)); // 300
console.log('src=0, dst=3, k=1 →', findCheapestPrice(4, flights2, 0, 3, 1)); // 600
console.log('src=0, dst=3, k=0 →', findCheapestPrice(4, flights2, 0, 3, 0)); // -1
console.log();

// =============================================================================
// Task 2 – Network Delay Time
// https://leetcode.com/problems/network-delay-time/
//
// Dijkstra from source node k. Answer is max dist across all nodes.
// Nodes are 1-indexed.
// =============================================================================

function networkDelayTime(times, n, k) {
  // Build adjacency list
  const graph = {};
  for (const [u, v, w] of times) {
    if (!graph[u]) graph[u] = [];
    graph[u].push([w, v]);
  }

  // dist array (1-indexed, so length n+1)
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;

  const pq = new MinHeap();
  pq.push([0, k]);

  while (pq.size > 0) {
    const [d, u] = pq.pop();

    // Stale entry
    if (d > dist[u]) continue;

    for (const [w, v] of (graph[u] || [])) {
      const newDist = dist[u] + w;
      if (newDist < dist[v]) {
        dist[v] = newDist;
        pq.push([newDist, v]);
      }
    }
  }

  // Check all nodes 1..n are reachable
  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxTime = Math.max(maxTime, dist[i]);
  }
  return maxTime;
}

console.log('=== Task 2: Network Delay Time ===');

const times1 = [[2,1,1],[2,3,1],[3,4,1]];
console.log('times =', JSON.stringify(times1), '  n=4, k=2');
console.log('Result →', networkDelayTime(times1, 4, 2)); // 2

const times2 = [[1,2,1]];
console.log('\ntimes =', JSON.stringify(times2), '  n=2, k=1');
console.log('Result →', networkDelayTime(times2, 2, 1)); // 1

const times3 = [[1,2,1],[2,3,2],[1,3,10]];
console.log('\ntimes =', JSON.stringify(times3), '  n=3, k=1');
console.log('Result →', networkDelayTime(times3, 3, 1)); // 3

const times4 = [[1,2,1]];
console.log('\ntimes =', JSON.stringify(times4), '  n=2, k=2  (unreachable node 1 from k=2)');
console.log('Result →', networkDelayTime(times4, 2, 2)); // -1
console.log();

// =============================================================================
// Task 3 – Reconstruct Itinerary
// https://leetcode.com/problems/reconstruct-itinerary/
//
// Hierholzer's algorithm (Eulerian path). Build sorted adjacency lists,
// then do iterative DFS, prepending nodes to the result on backtrack.
// =============================================================================

function findItinerary(tickets) {
  // Build adjacency list with sorted destinations (lexicographic order)
  const graph = {};
  for (const [from, to] of tickets) {
    if (!graph[from]) graph[from] = [];
    graph[from].push(to);
  }
  for (const key of Object.keys(graph)) {
    graph[key].sort();
  }

  const result = [];
  const stack = ['JFK'];

  while (stack.length > 0) {
    const airport = stack[stack.length - 1];
    if (graph[airport] && graph[airport].length > 0) {
      // Visit the lexicographically smallest next destination
      stack.push(graph[airport].shift());
    } else {
      // Dead end — this airport belongs to the final route
      result.unshift(stack.pop());
    }
  }

  return result;
}

console.log('=== Task 3: Reconstruct Itinerary ===');

const tickets1 = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]];
console.log('tickets =', JSON.stringify(tickets1));
console.log('Result  →', findItinerary(tickets1));
// ["JFK","MUC","LHR","SFO","SJC"]

const tickets2 = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]];
console.log('\ntickets =', JSON.stringify(tickets2));
console.log('Result  →', findItinerary(tickets2));
// ["JFK","ATL","JFK","SFO","ATL","SFO"]

const tickets3 = [["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]];
console.log('\ntickets =', JSON.stringify(tickets3));
console.log('Result  →', findItinerary(tickets3));
// ["JFK","NRT","JFK","KUL"]
