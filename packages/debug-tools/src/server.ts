import { createServer, IncomingMessage, ServerResponse } from 'http'
import path from 'path'
import serveHandler from 'serve-handler'
import { fetch } from './api/fetch'

const PUBLIC_PATH = path.resolve(__dirname, '../../output')
export const DEV_TOOL_PORT = 23333

const cors = (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
}

// Exported for mincu-debug
export const startDevTool = () => {
  createServer(async (req, res) => {
    cors(req, res)

    if (req.url?.includes('/api/fetch')) {
      return fetch(req, res)
    } else {
      return serveHandler(req, res, {
        public: PUBLIC_PATH,
      })
    }
  }).listen(DEV_TOOL_PORT, () => {
    console.log('\r' + `DebugTools listening on http://localhost:${DEV_TOOL_PORT}`)
  })
}