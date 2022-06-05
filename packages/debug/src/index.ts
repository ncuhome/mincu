import { _window } from 'mincu-lib'
import { Client } from './mincud/client'
import { LEVELS } from './mincud/shared'

class DebugModule {
  static Instance() {
    return new DebugModule()
  }

  client: Client

  constructor() {
    this.client = new Client()
  }

  applyChii() {
    this.client.initChii()
  }
  
  /**
   * @abstract apply our console to window.console, not replacing but appending
   * @note may causes memory leaks or maximum call stack size exceeded
   * @param {boolean} handleError true
   * @param {function} errorFormatter (event: ErrorEvent) => `${event.type}: ${event.message}\n`
   */
  applyConsole(handleError = true, errorFormatter = (event: ErrorEvent) => `${event.type}: ${event.message}\n`) {
    if (this.client.init()) {
      LEVELS.forEach(level => {
        const tmp = _window.console[level]
        if (tmp) {
          _window.console[level] = (...args: any[]) => {
            tmp(...args)
            this.client.log(level, ...args)
          }
        }
      })
      if (handleError) {
        _window.addEventListener('error', e => {
          this.client.log('error', errorFormatter(e))
        })
        _window.addEventListener("unhandledrejection", e => {
          this.client.log('error', e.reason)
        });
      }
    }
  }

  applyByDebugTools() {
    return this.client.initByDebugTools()
  }

  /**
   * Commands to send to the server
   * @param {string} command 
   * @param {any[]} args 
   * @returns 
   */
  command(command: string, args: any[]) {
    return this.client.command(command, args)
  }
}

export default DebugModule.Instance()
