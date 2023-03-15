// 打印出 1 - 10000 之间的所有对称数
function createSymmetry(len, base) {
  const result = []
  let tpl = 1
  if (len > 1) {
    tpl = `1${'0'.repeat(len-2)}1`
  }
  tpl = parseInt(tpl)
  for (let i = 1; i < 10; i++) {
    result.push(i*tpl + base * 10)
  }
  return result
}

function getSymmetry(max = 10000) {
  const str = max.toString()
  const len = str.length - 1
  if (len < 1) {
    return []
  }
  const result = []
  for (let i = 1; i <= len; i++) {
    if (i <= 2) {
      const symmetries = createSymmetry(i, 0) 
      result.push(...symmetries)
      continue
    }
    for (let j = 1; j <= 9; j++) {
      const symmetries = createSymmetry(i, result[j + (i - 3)*9 - 1])
      result.push(...symmetries)
    }
  }
  return result
}
console.log(getSymmetry(10000))