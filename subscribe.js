function subscribe() {
  this.map = {}
  this.on = function (event, fn) {
    if (this.map[event]) {
      this.map[event].push(fn)
    } else {
      this.map[event] = [fn]
    }
  }
  this.emit = function (event, data) {
    const subFns = this.map[event]

    for (let i = 0; i< subFns.length; i++) {
      subFns[i](data)
    }
  }
}