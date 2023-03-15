/**
 * calback: 
 * config: {
 *   wait: millionSeconds
 * }
 */
function debound (cb, config) {
  const { wait, leading = true } = config
  let timer = null
  if (leading) {
    if (!timer) {
      timer = setTimeout(() => {
        cb()
        clearTimeout(timer)
      }, wait)
    }
  } else {
    clearTimeout(timer)
    timer = setTimeout(() => cb, wait)
  }
}