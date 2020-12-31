/*
 * @lc app=leetcode.cn id=435 lang=javascript
 *
 * [435] 无重叠区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
//想法简单点哈
//先把所有区间遍历一遍
//先提条件
//区间[a,b]，其中b>a恒成立

//两个区间对比，如果b1<=a2，则区间无重叠，反之区间重叠
//区间无重叠，拿第二个区间和第三个区间对比(n-1次)
//有重叠以后看哪个区间范围很大，优先把范围最大从栈1删除，并推入栈2中
//遍历结束一次，栈1的数组都是没重叠的，将栈2变为栈1，重复上一步

//重叠数组栈长度只剩一个

//感觉可以写迭代也可以写遍历
var eraseOverlapIntervals = function (intervals) {
  let unKnowItems = intervals.sort((a, b) => {
    return a[0] - b[0]
  })
  let overlapItems = []
  let deleteCount = 0

  while (unKnowItems.length >= 2) {
    const length = unKnowItems.length
    for (let i = 0; i < length - 1; i++) {
      let a = unKnowItems[i]
      let b = unKnowItems[i + 1]
      //两个区间的判断出了点错
      if (a[1] > b[0]) {
        overlapItems.push(a[1] - a[0] > b[1] - b[0] ? a : b)
      }
    }
    if (overlapItems.length > 0) {
      deleteCount++
    }
    unKnowItems = overlapItems
    overlapItems = []
  }

  return deleteCount
};
// @lc code=end

