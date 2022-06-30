import { IncomingMessage, ServerResponse } from 'http'

type Listeners = (req: IncomingMessage, res: ServerResponse) => void

export const makeApi = (cb: Listeners) => {
  return (req: IncomingMessage, res: ServerResponse) => cb(req, res)
}
