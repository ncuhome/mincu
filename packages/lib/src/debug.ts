import { _window } from './utils'

export const REGEXP_NETWORK_HOST =
  /(http:\/\/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+):([0-9]+))/g
export const REGEXP_LOCAL_HOST = /(http:\/\/localhost:([0-9]+))/g

export const CMD_RELOAD = 'CMD_RELOAD'
export const CMD_DEV_TOOL = 'CMD_DEV_TOOL'

export const DEBUG_CHII_PORT = 2334
export const DEBUG_PORT = 2333
export const DEBUG_HOST = _window.location?.hostname || 'localhost'
export const LOG_LEVELS: LogLevel[] = [
  'trace',
  'info',
  'warn',
  'error',
  'log',
  'group',
  'groupCollapsed',
  'groupEnd',
  'debug',
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

export type RecvType = 'log' | 'command'

export interface Received {
  type: RecvType
  level?: LogLevel
  data: string[]
}
