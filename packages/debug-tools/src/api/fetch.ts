import got from 'got'
import { CookieJar } from "tough-cookie";
import { makeApi } from './common'

export const fetch = makeApi(async (req, res) => {
  if (!req.url) return
  // reverse proxy
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
})
