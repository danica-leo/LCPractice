/*
 * @lc app=leetcode.cn id=1046 lang=javascript
 *
 * [1046] 最后一块石头的重量
 */

// @lc code=start
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  var stones = stones.sort((a, b) => { return a - b })
  while (stones.length >= 2) {
    let x = stones.pop()//此处x>y
    let y = stones.pop()

    const newStone = x - y
    if (!!newStone) {
      const index = stones.findIndex(item => item >= newStone);
      if (index >= 0)
        stones.splice(index, 0, newStone)
      else
        stones.push(newStone)
    }
  }
  return stones[0] || 0
};

//大顶堆是啥？

// @lc code=end

