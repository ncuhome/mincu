import { _window } from 'mincu-lib'

export const DEBUG_PORT = 2333
export const DEBUG_HOST = _window.location?.hostname || 'localhost'
export const LEVELS: LogLevel[] =
  [
    'trace', 'info', 'warn', 'error', 'log',
    'group', 'groupCollapsed', 'groupEnd', 'debug'
  ]

export type LogLevel =
  | 'trace'
  | 'info'
  | 'warn'
  | 'error'
  | 'log'
  | 'group'
  | 'groupCollapsed'
  | 'groupEnd'
  | 'debug'