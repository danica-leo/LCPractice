/*
 * @lc app=leetcode.cn id=1203 lang=javascript
 *
 * [1203] 项目管理
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */
const topSort = (deg, graph, items) => {
  const Q = [];
  for (const item of items) {
    if (deg[item] === 0) {
      Q.push(item)
    }
  }
  const res = []
  while (Q.length) {
    const u = Q.shift()
    res.push(u)
    for (let i = 0; i < graph[u].length; ++i) {
      const v = graph[u][i]
      if (--deg[v] === 0) {
        Q.push(v)
      }
    }
  }
  return res.length == items.length ? res : [];
}

var sortItems = function (n, m, group, beforeItems) {
  const groupItem = new Array(n + m).fill(0).map(() => []);

  const groupGraph = new Array(n + m).fill(0).map(() => []);
  const itemGraph = new Array(n).fill(0).map(() => []);

  const groupDegree = new Array(n + m).fill(0);
  const itemDegree = new Array(n).fill(0)

  const id = new Array(n + m).fill(0).map((v, index) => index);

  //将剩余未分配到任务，分配到m以后的小组中
  let leftId = m;
  for (let i = 0; i < n; ++i) {
    if (group[i] === -1) {
      group[i] = leftId;
      leftId += 1;//被分配的小组id是大于M的
    }
    groupItem[group[i]].push(i);
  }

  for (let i = 0; i < n; ++i) {
    //n个项目，当前项目所属的小组id
    const curGroupId = group[i]
    for (const item of beforeItems[i]) {
      const beforeGroupId = group[item];
      if (beforeGroupId === curGroupId) {
        itemDegree[i] += 1;
        itemGraph[item].push(i);
      } else {
        groupDegree[curGroupId] += 1;
        groupGraph[beforeGroupId].push(curGroupId);
      }
    }
  }

  const groupTopSort = topSort(groupDegree, groupGraph, id);

  if (groupTopSort.length === 0) {
    return [];
  }
  const ans = [];
  for (const curGroupId of groupTopSort) {
    const size = groupItem[curGroupId].length;
    if (size == 0) {
      continue;
    }
    const res = topSort(itemDegree, itemGraph, groupItem[curGroupId]);
    if (res.length === 0) {
      return [];
    }
    for (const item of res) {
      ans.push(item)
    }
  }
  return ans
};
// @lc code=end

