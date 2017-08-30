var test = require('tape')
var merry = require('merry')
var http = require('http')
var to = require('to2')
var parallel = require('run-parallel')
var get = require('.')

var urls = [
  'http://127.0.0.1:8967',
  'http://127.0.0.1:8967/neat'
]

test('results is an array of streams', function (t) {
  var app = merry()
  app.route('GET', '/', function (req, res, ctx) {
    ctx.send(200, {wow: 'cool'})
  })
  app.route('GET', '/neat', function (req, res, ctx) {
    ctx.send(200, {neat: 'yeah'})
  })

  var server = http.createServer(app.start())
  server.listen(8967, function () {
    get(urls, function (err, results) {
      if (err) return t.ifError(err)
      parallel([
        function (cb) {
          results[0].pipe(to.obj(function (data, enc, next) {
            cb(null, data)
          }))
        },
        function (cb) {
          results[1].pipe(to.obj(function (data, enc, next) {
            cb(null, data)
          }))
        }
      ], function (err, results) {
        if (err) return t.ifError(err)
        t.same(JSON.parse(results[0].toString()), {wow: 'cool'})
        t.same(JSON.parse(results[1].toString()), {neat: 'yeah'})
        server.close()
        t.end()
      })
    })
  })
})

test('results is an array of buffers', function (t) {
  var app = merry()
  app.route('GET', '/', function (req, res, ctx) {
    ctx.send(200, {wow: 'cool'})
  })
  app.route('GET', '/neat', function (req, res, ctx) {
    ctx.send(200, {neat: 'yeah'})
  })

  var server = http.createServer(app.start())
  server.listen(8967, function () {
    get.concat(urls, function (err, results) {
      if (err) return t.ifError(err)
      t.same(JSON.parse(results[0].toString()), {wow: 'cool'})
      t.same(JSON.parse(results[1].toString()), {neat: 'yeah'})
      server.close()
      t.end()
    })
  })
})

