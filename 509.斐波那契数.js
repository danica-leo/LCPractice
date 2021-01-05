/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// var fib1 = function (n) {
//   if (n === 0 || n === 1) {
//     return n
//   }

//   return fib(n - 1) + fib(n - 2)
//   //时间复杂度n
//   //空间复杂度2n?
// };

// var fib2 = function (n) {
//   if (n === 0 || n === 1) {
//     return n
//   }
//   let sum;
//   let x1 = 1;
//   let x2 = 0;
//   for (let i = 2; i <= n; i++) {
//     sum = x1 + x2;
//     x2 = x1;
//     x1 = sum;
//   }
//   //时间复杂度n
//   //空间复杂度常数?
//   return sum
// }
// var fib3 = function (n) {
//   if (n === 0 || n === 1) {
//     return n
//   }
//   let sum;
//   let arr = [0, 1];
//   for (let i = 2; i <= n; i++) {
//     sum = arr[0] + arr[1];
//     arr.splice(0, 1)
//     arr.push(sum)
//   }
//   //时间复杂度n
//   //空间复杂度常数?O（1）
//   return sum
// }

//你甚至还能写通项公式！
// 线性代数，矩阵快速幂

// @lc code=end

