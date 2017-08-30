# parallel-get

> http GET an array of urls in parallel

This is some simple glue code that uses `simple-get` inside `run-parallel`. It
can return an array of of streams or an array of buffers.

## Usage

```js
var parallelGet = require('parallel-get')

var urls = [
  'http://127.0.0.1:8967',
  'http://127.0.0.1:8967/neat'
]

parallelGet(urls, function (err, results) {
  if (err) return console.error(err)
  console.log(results) // <- array of streams of http GET data
  results[0].pipe(process.stdout)
  results[1].pipe(process.stdout)
})

parallelGet.concat(urls, function (err, results) {
  if (err) return console.error(err)
  console.log(results) // <- array of buffers of http GET data
  console.log(results[0].toString())
  console.log(results[1].toString())
})
```

## API

```js
var parallelGet = require('parallel-get')

parallelGet(array, cb)
// array is an array of urls
// cb takes (err, results)
// results is an array of streams

parallelGet.concat(array, cb)
// array is an array of urls
// cb takes (err, results)
// results is an array of buffers

```

## Install

```
$ npm install parallel-get
```

## See Also

- [`run-parallel`](https://github.com/feross/run-parallel)
- [`simple-get`](https://github.com/feross/simple-get)

## License

MIT

