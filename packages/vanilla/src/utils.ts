export const toObj = (proto) => {
  let jsoned = {}
  let toConvert = proto
  Object.getOwnPropertyNames(toConvert).forEach((prop) => {
    const val = toConvert[prop]
    // don't include those
    if (prop === 'toJSON' || prop === 'constructor') {
      return
    }
    if (typeof val === 'function') {
      jsoned[prop] = val.bind(jsoned)
      return
    }
    jsoned[prop] = val
  })

  const inherited = Object.getPrototypeOf(toConvert)
  if (inherited !== null) {
    Object.keys(toObj(inherited)).forEach((key) => {
      if (!!jsoned[key] || key === 'constructor' || key === 'toJSON') return
      if (typeof inherited[key] === 'function') {
        jsoned[key] = inherited[key].bind(jsoned)
        return
      }
      jsoned[key] = inherited[key]
    })
  }
  return jsoned
}
