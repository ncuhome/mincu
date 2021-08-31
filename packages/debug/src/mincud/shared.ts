import { _window } from 'mincu-lib'

export const REGEXP_NETWORK_HOST = /(http:\/\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+):([0-9]+))/g
export const REGEXP_LOCAL_HOST = /(http:\/\/localhost:([0-9]+))/g

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