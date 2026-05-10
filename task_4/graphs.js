// =============================================================================
// ADS Assignment 4 – Graph Algorithms
// =============================================================================

// =============================================================================
// TASK 1 & 2 – Graph definition (adjacency list)
// =============================================================================

const graph = {
  A: ['C', 'B', 'D'],
  B: ['A', 'C', 'E', 'G'],
  C: ['A', 'B', 'D'],
  D: ['C', 'A'],
  E: ['G', 'F', 'B'],
  F: ['G', 'E'],
  G: ['F', 'B'],
};

// =============================================================================
// TASK 1 – Depth First Search (Sedgewick & Wayne, Algorithms 4th ed., p.537)
// =============================================================================

function dfs(graph, source) {
  const marked = {};
  const visitOrder = [];
  const edgeTo = {};

  function visit(v) {
    marked[v] = true;
    visitOrder.push(v);
    console.log(`  dfs(${v}) → marked`);

    for (const w of graph[v]) {
      if (!marked[w]) {
        edgeTo[w] = v;
        console.log(`    ${v}–${w}: not marked → recurse`);
        visit(w);
      } else {
        console.log(`    ${v}–${w}: already marked, skip`);
      }
    }
  }

  console.log('=== Task 1: DFS trace from', source, '===');
  visit(source);
  console.log('DFS visit order:', visitOrder.join(' → '));
  console.log('edgeTo:', edgeTo);
  console.log();
  return visitOrder;
}

// =============================================================================
// TASK 2 – Breadth First Search (Sedgewick & Wayne, Algorithms 4th ed., p.539)
// =============================================================================

function bfs(graph, source) {
  const marked = {};
  const distTo = {};
  const edgeTo = {};
  const visitOrder = [];
  const queue = [];

  marked[source] = true;
  distTo[source] = 0;
  queue.push(source);

  console.log('=== Task 2: BFS trace from', source, '===');
  console.log(`  enqueue ${source}, mark ${source}, dist=0`);

  while (queue.length > 0) {
    const v = queue.shift();
    visitOrder.push(v);
    console.log(`  dequeue ${v} (dist=${distTo[v]}), examine neighbours [${graph[v].join(', ')}]`);

    for (const w of graph[v]) {
      if (!marked[w]) {
        marked[w] = true;
        edgeTo[w] = v;
        distTo[w] = distTo[v] + 1;
        queue.push(w);
        console.log(`    ${v}–${w}: not marked → enqueue ${w}, dist=${distTo[w]}`);
      } else {
        console.log(`    ${v}–${w}: already marked, skip`);
      }
    }
  }

  console.log('BFS visit order:', visitOrder.join(' → '));
  console.log('distTo:', distTo);
  console.log('edgeTo:', edgeTo);
  console.log();
  return visitOrder;
}

// =============================================================================
// TASK 3 – Run and compare
// =============================================================================

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║              ADS Assignment 4 – Graph Algorithms             ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const dfsOrder = dfs(graph, 'A');
const bfsOrder = bfs(graph, 'A');

console.log('=== Task 3: Comparison ===');
console.log('DFS order: ', dfsOrder.join(' → '));
console.log('BFS order: ', bfsOrder.join(' → '));
console.log();

// =============================================================================
// TASK 4 – Dijkstra's Shortest Path: Edinburgh → Dundee
// Scottish road network (weighted undirected graph)
//
//  Edinburgh – Stirling  : 50
//  Edinburgh – Glasgow   : 70
//  Edinburgh – Perth     : 100
//  Stirling  – Glasgow   : 50
//  Stirling  – Perth     : 40
//  Perth     – Dundee    : 60
// =============================================================================

const roads = {
  Edinburgh: [['Stirling', 50], ['Glasgow', 70], ['Perth', 100]],
  Stirling:  [['Edinburgh', 50], ['Glasgow', 50], ['Perth', 40]],
  Glasgow:   [['Edinburgh', 70], ['Stirling', 50]],
  Perth:     [['Edinburgh', 100], ['Stirling', 40], ['Dundee', 60]],
  Dundee:    [['Perth', 60]],
};

function dijkstra(graph, source, target) {
  const dist = {};
  const prev = {};
  const visited = new Set();

  for (const node of Object.keys(graph)) {
    dist[node] = Infinity;
  }
  dist[source] = 0;

  console.log('=== Task 4: Dijkstra – Edinburgh → Dundee ===');
  console.log(`Initial distances: ${JSON.stringify(dist)}\n`);

  while (true) {
    // Pick unvisited node with smallest tentative distance
    let u = null;
    for (const node of Object.keys(dist)) {
      if (!visited.has(node) && (u === null || dist[node] < dist[u])) {
        u = node;
      }
    }

    if (u === null || dist[u] === Infinity) break;
    if (u === target) break;

    visited.add(u);
    console.log(`Visit: ${u}  (dist=${dist[u]})`);

    for (const [v, weight] of graph[u]) {
      if (visited.has(v)) continue;
      const alt = dist[u] + weight;
      console.log(`  Relax edge ${u}–${v}: ${dist[u]}+${weight}=${alt} vs current ${dist[v]}`);
      if (alt < dist[v]) {
        dist[v] = alt;
        prev[v] = u;
        console.log(`    → updated dist[${v}] = ${alt}, prev[${v}] = ${u}`);
      }
    }
  }

  // Reconstruct path
  const path = [];
  let cur = target;
  while (cur !== undefined) {
    path.unshift(cur);
    cur = prev[cur];
  }

  console.log();
  console.log(`Shortest distance Edinburgh → Dundee: ${dist[target]} km`);
  console.log(`Path: ${path.join(' → ')}`);
  console.log();
  return { distance: dist[target], path };
}

dijkstra(roads, 'Edinburgh', 'Dundee');
