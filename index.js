import  { pipeline } from 'node:stream/promises'
import  { Transform } from 'node:stream'
import { parse } from 'csv-parse'


// convert object to string
const toString = new Transform({
  writableObjectMode: true,
  transform (chunk, encoding, callback) {
    callback(null, JSON.stringify(chunk) + '\n')
  }
})

// stream 
export async function csvtojsonl(opts) {
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

