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

  /**
   * @abstract apply our console to window.console, not replacing but appending
   * @note may causes memory leaks or maximum call stack size exceeded
   */
  applyConsole() {
    this.client.init()
    LEVELS.forEach(level => {
      const tmp = _window.console[level]
      if (tmp) {
        _window.console[level] = (...args: any[]) => {
          tmp(...args)
          this.client.log(level, ...args)
        }
      }
    })
  }
}

export default DebugModule.Instance()
