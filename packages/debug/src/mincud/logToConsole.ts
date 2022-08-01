/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @see https://github.com/facebook/metro/blob/master/packages/metro/src/lib/logToConsole.js
 */
import chalk from 'chalk'
import util from 'util'
import { LogLevel } from 'mincu-lib/debug'

const groupStack = []
let collapsedGuardTimer

export const logToConsole = (level: LogLevel, data: any[]) => {
  const logFunction = console[level] && level !== 'trace' ? level : 'log'
  const color =
    level === 'error'
      ? chalk.inverse.red
      : level === 'warn'
      ? chalk.inverse.yellow
      : level === 'info'
      ? chalk.inverse.blue
      : chalk.inverse.white

  if (level === 'group') {
    groupStack.push(level)
  } else if (level === 'groupCollapsed') {
    groupStack.push(level)
    clearTimeout(collapsedGuardTimer)
    // Inform users that logs get swallowed if they forget to call `groupEnd`.
    collapsedGuardTimer = setTimeout(() => {
      if (groupStack.includes('groupCollapsed')) {
        console.log(
          chalk.inverse.yellow.bold(' WARN '),
          'Expected `console.groupEnd` to be called after `console.groupCollapsed`.'
        )
        groupStack.length = 0
      }
    }, 3000)
    return
  } else if (level === 'groupEnd') {
    groupStack.pop()
    if (!groupStack.length) {
      clearTimeout(collapsedGuardTimer)
    }
    return
  }

  if (!groupStack.includes('groupCollapsed')) {
    // Remove excess whitespace at the end of a log message, if possible.
    const lastItem = data[data.length - 1]
    if (typeof lastItem === 'string') {
      data[data.length - 1] = lastItem.trimEnd()
    }

    console.log(
      color.bold(` ${logFunction.toUpperCase()} `) +
        ''.padEnd(groupStack.length * 2, ' '),
      // `util.format` actually accepts any arguments.
      // If the first argument is a string, it tries to format it.
      // Otherwise, it just concatenates all arguments.
      // $FlowIssue[incompatible-call] util.format expected the first argument to be a string
      util.format(...data)
    )
  }
}
