import { createServer, IncomingMessage, ServerResponse } from 'http'
import path from 'path'
import serveHandler from 'serve-handler'
import { preview } from './api/preview'
import { makeApi } from './api/common'
import internalIp from 'internal-ip'

const IPV4 = internalIp.v4.sync()

const PUBLIC_PATH = path.resolve(
  __dirname,
  __dirname.includes('dist') ? '../' : '',
  '../output'
)
export const DEV_TOOL_PORT = 23333

const cors = (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }
}

// Exported for mincu-debug
export const startDevTool = () => {
  createServer(async (req, res) => {
    cors(req, res)

    const url = req.url || ''

    if (url.includes('/api/preview')) {
      return preview(req, res)
    } else if (url.includes('/api/ip')) {
      return makeApi((req, res) => {
        res.end(IPV4)
      })(req, res)
    } else {
      return serveHandler(req, res, {
        public: PUBLIC_PATH,
      })
    }
  }).listen(DEV_TOOL_PORT, () => {
    console.log(
      '\r' + `DebugTools listening on http://localhost:${DEV_TOOL_PORT}`
    )
  })
}
