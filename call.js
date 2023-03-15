function myCall(fn, target) {
  const symbol = Symbol('fn')
  target[symbol] = fn
  const args = arguments.slice(2)
  target[symbol](...args)
  delete target[symbol]
}
function bind(fn, context) {
  const symbol = Symbol('fn')
  context[symbol] = fn
  return () => {
    context[symbol](...arguments)
  }
}