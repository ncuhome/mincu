import prettyFormat, { plugins } from 'pretty-format'
import WebSocket from 'isomorphic-ws'
import { _window } from '@lib/utils'
import { DEBUG_HOST, DEBUG_PORT, LogLevel } from './shared'

export class Client {
  private client: WebSocket
  private opened: boolean = false
  init() {
    if (this.client || this.opened) return
    try {
      this.client = new WebSocket(`ws://${DEBUG_HOST}:${DEBUG_PORT}`)
      if (this.client) {
        this.client.onerror = console.error
        this.client.onopen = () => {
          this.opened = true
          this.log('info', `${_window.location?.origin} has connected`)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * @description send log message to websocket server
   * @see https://github.com/facebook/metro/blob/master/packages/metro/src/HmrServer.js?#L211-L218
   * @note call console[level] in this function will cause maximum call stack error
   */
  log(level: LogLevel, ...args: any[]) {
    if (!this.client) {
      this.init()
    }
    if (!this.opened) {
      return
    }
    try {
      this.client.send(
        JSON.stringify({
          type: 'log',
          level,
          data: args.map(item =>
            typeof item === 'string'
              ? item
              : prettyFormat(item, {
                escapeString: true,
                highlight: true,
                maxDepth: 3,
                min: true,
                plugins: [plugins.ReactElement],
              }),
          ),
        }),
      );
    } catch (err) {
      console.error(err)
    }
  }
}