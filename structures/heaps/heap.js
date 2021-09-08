/**
 * Heap data structure a.k.a Priority Queue
 * Used to get min or max values from a collection in constant time.
 * 堆数据结构，又称优先队列
 * 用于在稳定时间内从一个集合中获取最小或最大值。
 * 堆的样子如下
 * array [a,b,c,d,e]
 * 画图
 * [    a    ]
 * [   /\    ]
 * [  b  c   ]
 * [ /\      ]
 * [d e      ]
 * 序号0的左右子元素序号为12
 * 序号1的左右子元素序号为34
 * 根据当前元素序号获取其子元素序号如下
 *   const parent = (i) => Math.ceil(i / 2 - 1);
 *   const left = (i) => 2 * i + 1;
 *   const right = (i) => 2 * i + 2;
 */
class Heap {
    constructor(comparator = (a, b) => a - b) {
        this.array = [];
        this.comparator = (i1, i2) => {
            const value = comparator(this.array[i1], this.array[i2]);
            if (Number.isNaN(value)) {
                throw new Error(`Comparator should evaluate to a number,Got ${value} when comparing ${this.array[i1]} with ${this.array[i2]}`);
            }
            return value;
        }
    }

    /**
     * Insert element
     * 向堆中插入新元素
     * @runtime O(log n)
     * @param {Number} value
     */
    add(value) {
        this.array.push(value);
        this.bubbleUp();
    }

    /**
     * Retrieves,but does not remove,the head of this heap
     * 检索堆顶，只读
     * @runtime O(1)
     */
    peek() {
        return this.array[0];
    }

    /**
     * Retrieves and removes the head of this heap，or returns null if this heap is empty
     * 检索并删除堆顶，如果此堆为空，则返回null
     * @param {Number} index 
     * @runtime O(log n)
     */
    remove(index = 0) {
        if (!this.size) return null;
        this.swap(index, this.size - 1);//把堆顶元素和堆底元素交换
        const value = this.array.pop();//弹出最值
        this.bubbleDown(index);//重新整理堆
        return value;
    }

    /**
     * Returns the number of elements in this collection
     * 获取堆的元素总数
     * @runtime O(1)
     */
    get size() {
        return this.array.length;
    }

    /**
     * Move new element upwards on the heap,if it's out of order
     * 对于乱序堆，将新元素向上移动到顶部
     * @runtime O(log n)
     */
    bubbleUp() {
        //前提是插入元素前的堆符合规则
        //在堆底插入新元素以后，从堆底开始遍历排序
        let index = this.size - 1;
        const parent = (i) => Math.ceil(i / 2 - 1);
        while (parent(index) >= 0 && this.comparator(parent(index), index) > 0) {
            //父元素没超出边界的情况下，比较父子元素大小
            //如果父元素位置不符合规则，就交换顺序
            this.swap(parent(index), index);
            index = parent(index);
        }
    }

    /**
     * After removal,moves element downwards on the heap,if it's out of order
     * 移除元素后，整理乱序元素
     * @param {*} index 
     */
    bubbleDown(index = 0) {
        //前提是移除堆顶元素前的堆符合规则
        //从序号0开始整理堆
        let curr = index;
        const left = (i) => 2 * i + 1;
        const right = (i) => 2 * i + 2;
        const getTopChild = (i) => (
            right(i) < this.size && this.comparator(left(i), right(i)) > 0 ? right(i) : left(i)
        );

        while (left(curr) < this.size && this.comparator(curr, getTopChild(curr)) > 0) {
            const next = getTopChild(curr)
            this.swap(curr, next);
            curr = next;
        }
    }

    /**
     * Swap elements on the heap
     * @return O(1)
     * @param {number} i1 index 1
     * @param {number} i2 index 2
     */
    swap(i1, i2) {
        //ES6 Destructuring assignment
        //ES6 新特性 解构赋值
        [this.array[i1], this.array[i2]] = [this.array[i2], this.array[i1]]
    }
}

// aliases
Heap.prototype.poll = Heap.prototype.remove;
Heap.prototype.offer = Heap.prototype.add;
Heap.prototype.element = Heap.prototype.peek;

module.exports = Heap;