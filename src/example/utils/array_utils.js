function rotateLeft(arr) {
  let firstEl = arr.shift()
  arr.push(firstEl)
  return arr
}

function rotateRight(arr) {
  let lastEl = arr.pop()
  arr.unshift(lastEl)
  return arr
}

export { rotateLeft, rotateRight }