import prettyFormat, { plugins } from 'pretty-format'
import WebSocket, { MessageEvent } from 'isomorphic-ws'
import { _window } from 'mincu-lib'
import { CMD_DEV_TOOL, CMD_RELOAD, DEBUG_HOST, DEBUG_PORT, LogLevel } from './shared'

export class Client {
  static KEY_DEV_TOOL = 'DEV_TOOL'
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
        this.client.onmessage = this.bindServerCommand
        if (this.devToolActive()) {
          this.injectDevTool()
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  bindServerCommand = (event: MessageEvent) => {
    const { data } = event
    const cmd = data.toString()
    switch (cmd) {
      case CMD_RELOAD:
        _window.location?.reload()
        break;
      case CMD_DEV_TOOL:
        this.toggleDevTool()
        break;
    }
  }

  devToolActive() {
    return localStorage.getItem(Client.KEY_DEV_TOOL) === 'true'
  }

  toggleDevTool() {
    const active = this.devToolActive()
    if (!active) {
      this.injectDevTool()
    } else {
      _window.eruda?.destroy()
    }
    localStorage.setItem(Client.KEY_DEV_TOOL, String(!active))
  }

  /**
   * @description inject eruda console script
   * @see https://github.com/liriliri/eruda
   */
  injectDevTool() {

    const script = document.createElement('script');
    script.src = "//cdn.jsdelivr.net/npm/eruda";
    document.body.appendChild(script);
    script.onload = () => { _window.eruda?.init() }
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