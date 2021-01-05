/*
 * @lc app=leetcode.cn id=830 lang=javascript
 *
 * [830] 较大分组的位置
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number[][]}
 */
var largeGroupPositions = function (s) {
  //遍历,两个指针，右指针放在区间开头，左指针移动对比
  //拿到序号为flag=n的字母char，
  //计数器count=1
  //用字母char和序号n+1的对比
  //相同则计数器count+1，进行下一次比较
  //不同则将count>=3?存储[flag，flag+count-1]
  //更换flag=n+count，字母char，重置count
  const length = s.length;
  const result = [];
  let flag = 0
  while (flag < length) {
    let count = 1;
    char = s[flag];
    for (let m = flag + 1; m < length; m++) {
      if (char === s[m]) {
        count++
      } else {
        break
      }
    }
    if (count >= 3) {
      result.push([flag, flag + count - 1])
    }
    flag = flag + count
  }
  return result
  //复杂度n
  //空间复杂度常数
};
// @lc code=end

