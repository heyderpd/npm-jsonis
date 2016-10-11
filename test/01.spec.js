// requided's

const assert = require('assert')
const fs = require('fs')

const jsonis = require('../npm/index')


// start test

const jsonRaw = fs.readFileSync(
                                 './npm/package.json',
                                 'utf8')
const jsonObj = JSON.parse(jsonRaw)
const jsonRawAuto = jsonis(jsonObj)

describe('jsonis', function() {
  it('basic', function() {
    assert.deepEqual(jsonRawAuto, jsonRaw)
  })
})
