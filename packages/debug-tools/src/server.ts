import { createServer, IncomingMessage, ServerResponse } from 'http'
import path from 'path'
import serveHandler from 'serve-handler'
import got from 'got'
import { CookieJar } from "tough-cookie";

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
    if (req.url?.includes('/api/fetch')) {
      // reverse proxy
      cors(req, res)
      const params = new URLSearchParams(req.url.split('?')[1])
      const target = params.get('target')
      if (target) {
        const cookieJar = new CookieJar();
        try {
          const response = await got(decodeURIComponent(target),
            { timeout: 10000, cookieJar }
          );
          res.end(response.body);
          return;
        } catch (e: any) {
          return res.end(e.message);
        }
      } else {
        res.end('No target')
      }
    } else {
      return serveHandler(req, res, {
        public: PUBLIC_PATH,
      })
    }
  }).listen(DEV_TOOL_PORT, () => {
    console.log('\r' + `listening on http://localhost:${DEV_TOOL_PORT}`)
  })
}