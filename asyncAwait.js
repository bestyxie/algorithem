function c() {
  return new Promise(resolve => setTimeout(() => resolve(1), 200))
}

function* myAsync() {
  try {
    const b = yield Promise.reject('xxxx')
    const d = yield c()
    const f = yield 2
    return b + f + d
  } catch (e) {
    console.log('1111')
  }
}

function autoStart(fn) {
  const it = fn()
  return new Promise((resolve) => {
    const next = function(preValue) {
      const res = it.next(preValue)
      if (res.done) {
        resolve(res.value)
      } else if (res.value instanceof Promise) {
        try {
          res.value.then((val) => next(val), (e) => it.throw(e))
        }catch(e) {
          console.log(222)
        } 
      } else {
        next(res.value)
      }
    }
    next()
  })
}

autoStart(myAsync).then(val => console.log(val))