#!/usr/bin/env node
import concurrently from 'concurrently'
import path from 'path'
const args = process.argv.slice(2)

const SERVER_BIN = path.join(__dirname, '../server.js')

const CON_OPTS: concurrently.Options = {
  raw: true
}

concurrently(
  [`node -e "require('${SERVER_BIN}').startServer()"`, ...args],
  CON_OPTS
)