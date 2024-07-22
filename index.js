const { pipeline } = require('node:stream/promises')
const { Transform } = require('node:stream')
const { parse } = require('csv-parse')

// convert object to string
const toString = new Transform({
  writableObjectMode: true,
  transform (chunk, encoding, callback) {
    callback(null, JSON.stringify(chunk) + '\n')
  }
})

// stream 
const csvtojsonl = async (opts) => {
  // options
  opts.delimiter = opts.delimiter || '\t'

  // streams
  opts.rs = opts.rs || process.stdin
  opts.ws = opts.ws || process.stdout

  // csv parser
  const objectifier = parse({
    bom: true,
    quote: '"',
    delimiter: opts.delimiter,
    columns: true,
    skip_empty_lines: true,
    relax: true,
    relax_quotes: true
  })

  // stream input --> csv parser --> to string --> stream output
  await pipeline(
    opts.rs,
    objectifier,
    toString,
    opts.ws,
    { end: false }
  )
}

module.exports = csvtojsonl
