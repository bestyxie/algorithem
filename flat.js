/**
 * @param arr: Array
 */
function flat(arr) {
  const result = []
  const queue = [arr]
  while (queue.length > 0) {
    const arr = queue.shift()
    for (let i=0; i< arr.length; i++) {
      if (Array.isArray(arr[i])) {
        queue.push(arr[i])
        queue.push(arr.slice(i+1))
        break
      } else {
        result.push(arr[i])
      }
    }
  }
  return result
}

console.log(flat([1, [2, 3,[4, 5], 6], 7]))