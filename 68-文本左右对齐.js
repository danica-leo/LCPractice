//没考虑清楚各种边界
//有好好的分离各种小情况
var fullJustify = function (words, maxWidth) {
  const L = words.length
  //单词遍历完就停止
  //获取单行单词，有多少行是未知的
  let flag = 0
  const rows = []
  while (flag < L) {
    let curLength = 0, curRow = []
    for (let i = flag; i < L; i++) {
      let curWord = words[i]
      curLength += curWord.length
      if (curLength <= maxWidth - curRow.length) {
        curRow.push(curWord)
        flag = i + 1
      } else {
        const row = setAlign(curRow, maxWidth)
        rows.push(row)
        i = L
      }
      if (i === L - 1) {
        let lastRow = curRow.join(" ").padEnd(maxWidth)
        rows.push(lastRow)
      }
    }
  }
  return rows
}

function setAlign (words, L) {
  const length = words.length
  if (length === 1) {
    return words[0].padEnd(L)
  }

  let wordsLength = 0
  for (let i = 0; i < length; i++) {
    wordsLength += words[i].length
  }
  console.log("单词总共包含字母数量", wordsLength)
  const spaces = L - wordsLength
  const breaks = length - 1
  const first = Math.floor(spaces / breaks)
  let rests = spaces - first * breaks
  console.log(`总共有个${breaks}分割，分隔是${first}，后面还要分配${rests}`)
  let result = ''
  for (let i = 0; i < length; i++) {
    result += words[i]
    if (i != length - 1) {
      result = result.padEnd(result.length + first)
      if (rests) {
        result += " "
        rests--
      }
    }
  }
  return result
}

