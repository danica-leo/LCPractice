/*
 * @lc app=leetcode.cn id=684 lang=javascript
 *
 * [684] 冗余连接
 */

// @lc code=start
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
//这题暂时还是不怎么会
var findRedundantConnection = function (edges) {
  const nodesCount = edges.length;
  //数组，n+1个数组，当前的zhi parent【n】=n
  const parent = new Array(nodesCount + 1).fill(0).map((value, index) => index);
  for (let i = 0; i < nodesCount; i++) {
    const edge = edges[i];
    const node1 = edge[0], node2 = edge[1];
    if (find(parent, node1) != find(parent, node2)) {
      union(parent, node1, node2);
    } else {
      return edge;
    }
  }
  return [0]
};
const union = (parent, index1, index2) => {
  parent[find(parent, index1)] = find(parent, index2);
}

const find = (parent, index) => {
  if (parent[index] !== index) {
    parent[index] = find(parent, parent[index]);
  }
  return parent[index];
}
// @lc code=end

