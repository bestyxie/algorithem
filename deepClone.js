function ifReference(value) {
  return typeof value === 'object' && value !== null
}

function getTypeClass(value) {
  return Object.prototype.toString.call(value).replace(/^\[object (\S+)\]$/, '$1').toLowerCase()
}

function getClonedReference(value, map) {
  let clonedReference
  let isCycle = false
  if (map.has(value)) {
    clonedReference = map.get(value)
    isCycle = true
  } else {
    clonedReference = new value.constructor()
  }
  return { clonedReference, isCycle }
}

function deepClone(target) {
  const map = new WeakMap()
  const { clonedReference } = getClonedReference(target, map)
  const queue = [{ source: target, draft: clonedReference }]

  while(queue.length > 0) {
    const { source, draft } = queue.shift()
    if (ifReference(source)) {
      return source
    }
    const typeStr = getTypeClass(target)
    if (typeStr === 'array') {
      for (let i = 0; i< source.length; i++) {
        if (ifReference(source[i])) {
          const { clonedReference, isCycle } = getClonedReference(source[i], map)
          if (isCycle) {
            draft.push(clonedReference)
          } else {
            queue.push({ source: source[i], draft: clonedReference })
          }
        } else {
          draft.push(clone(source[i]))
        }
      }
      continue
    }
    if (typeStr === 'object') {
      Reflect.ownKeys(source).forEach(key => {
        if (source.propertyIsEnumerable(key)) {
          if (ifReference(source[key])) {
            const { clonedReference, isCycle } = getClonedReference(source[key], map)
            if (isCycle) {
              draft[key] = clonedReference
            } else {
              queue.push({ source: source[key], draft: clonedReference })
            }
          } else {
            draft[key] = source[key]
          }
        }
      })
      continue
    }

    if (typeStr === 'map') {
      for (const [key, val] of target) {
        if (ifReference(val)) {
          const { clonedReference, isCycle } = getClonedReference(val, map)
          if (isCycle) {
            draft.set(key, clonedReference)
          } else {
            queue.push({ source: val, draft: clonedReference })
          }
        } else {
          draft.set(key, val)
        }
      }
      continue
    }
    if (typeStr === 'set') {
      target.forEach((val) => {
        if (ifReference(val)) {
          const { clonedReference, isCycle } = getClonedReference(val, map)
          if (isCycle) {
            draft.add(clonedReference)
          } else {
            queue.push({ source: val, draft: clonedReference })
          }
        } else {
          result.add(key, val)
        }
      })
      return result
    }
    if (typeStr === 'date') {
      return new Date(target.valueOf())
    }
    if (typeStr === 'regexp') {
      return new RegExp(target.source, target.flags)
    }
  }

  return clonedReference
}

const symb1 = Symbol('symb1')

const obj1 = {
  a: 'a',
  b: 'b',
}

const obj = {
  a: 1,
  b: 'abc',
  d: new Date(),
  e: new Map([['a', 1], ['b', 2]]),
  [symb1]: 'this is symbol key value',
  f: {
    cc: '777',
  },
  g: obj1,
}
obj1.c = obj
console.log(deepClone(obj))