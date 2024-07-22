#!/usr/bin/env node
const { parseArgs } = require('node:util')
const csvtojsonlines = require('../index.js')
const syntax =
`Syntax:
--delimiter/-d           The CSV delimiter                     (default: <tab>)
`
const argv = process.argv.slice(2)
const options = {
  delimiter: {
    type: 'string',
    short: 'd',
    default: '\t'
  },
  help: {
    type: 'boolean',
    short: 'h',
    default: false
  }
}

// parse command-line options
const { values } = parseArgs({ argv, options })

// help mode
if (values.help) {
  console.log(syntax)
  process.exit(0)
}

const main = async () => {
  await csvtojsonlines(values)
}
main()
