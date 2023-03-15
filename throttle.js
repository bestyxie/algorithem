/**
 @param calback: 
 @param wait: millionSeconds
 */
function throttle (cb, wait) {
  const { wait } = config
  let timer = null
  if (!timer) {
    timer = setInterval(() => {
      cb()
      clearTimeout(timer)
    }, wait)
  }
}
