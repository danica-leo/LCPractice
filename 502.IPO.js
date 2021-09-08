
import Heap from './structures/heaps/heap'
/**
  * @param {number} k 可完成项目数量上限
  * @param {number} w 初始资本
  * @param {number[]} profits 给定的可用项目纯利润
  * @param {number[]} capital 给定的可用项目前提利润
  * @return {number} 最终的最大利润
  * 试了很多题解，提交结果都是时间33.3%，空间33.3%
  * 做题的时候边界又把自己绕进去了
  */
var findMaximizedCapital = function (k, w, profits, capital) {
    const n = profits.length;
    const arr = new Array(n);
    for (let i = 0; i < n; i++) {
        arr[i] = [capital[i], profits[i]];
    }
    arr.sort((a, b) => a[0] - b[0]);

    const usableHeap = new Heap(
        (a, b) => b - a
    )

    let cur = 0;
    for (let i = 0; i < k; i++) {
        while (cur < n && arr[cur][0] <= w) {
            usableHeap.add(arr[cur++][1]);
        }
        if (usableHeap.size) {
            w += usableHeap.remove();
        } else {
            break;
        }
    }
    return w;
};
