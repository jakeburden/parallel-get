var parallel = require('run-parallel')
var get = require('simple-get')

module.exports = parallelGet
module.exports.concat = parallelGetConcat

function parallelGet (arr, cb) {
  var getUrls = []

  arr.forEach(function (url) {
    getUrls.push(function (cb) {
      get(url, function (err, res) {
        if (err) return cb(err)
        cb(null, res)
      })
    })
  })

  parallel(getUrls, function (err, results) {
    if (err) return cb(err)
    cb(null, results)
  })
}

function parallelGetConcat (arr, cb) {
  var getUrls = []

  arr.forEach(function (url) {
    getUrls.push(function (cb) {
      get.concat(url, function (err, res, data) {
        if (err) return cb(err)
        cb(null, data)
      })
    })
  })

  parallel(getUrls, function (err, results) {
    if (err) return cb(err)
    cb(null, results)
  })
}

