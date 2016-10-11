
/*!
 * jsonis
 * Copyright (c) 2016 heyderpd <heyderpd@gmail.com>
 * ISC Licensed
 */

const tabSpaces = (qtd) => {
  qtd *= 2
  let spaces = ''
  while (qtd-- > 0) {
    spaces += ' '
  }
  return spaces
}

const identJSONstr = (obj, tabOld = '', ident = 0, R) => {
  if(R++ > 42)
    throw new Error("Limit recursive exceeded in f.identJSONstr")

  ident += 1
  const tabIn = tabSpaces(ident)
  const type = (obj && obj.constructor) ? obj.constructor : undefined

  if (type !== Array && type !== Object) {
    return `"${String(obj).replace(/\"/gim, '\\"')}"`
  } else {
    let sta, end
    if (type === Object) {
      sta = '{'
      end = '}'
    } else {
      sta = '['
      end = ']'
    }
    if (length(obj) === 0) {
      return `${sta}${end}`
    } else {
      let lines = []
      if (type === Object) {
        each(obj, (key, value) => {
          value = identJSONstr(value, tabIn, ident, R)
          lines.push(`${tabIn}"${key}": ${value}`)
        })        
      } else {
        each(obj, (key, value) => {
          value = identJSONstr(value, tabIn, ident, R)
          lines.push(`${tabIn}${value}`)
        })
      }
      return `${sta}\n${lines.join(',\n')}\n${tabOld}${end}`
    }
  }
}

const main = (obj) => identJSONstr(obj)

const { length, keys, each } = require('pytils')

module.exports = main
