import execa from 'execa'

const isRunningOutput = (output: string) => {
  return output.includes('Version:')
    && output.includes('Code')
    && output.includes('OS Version:')
    && output.includes('electron_node')
}

/**
 * Check if VSCode is running, through the `code -s` command.
 * @returns Promise<boolean>
 */
export const isVsCodeRunning = () => {
  return new Promise<boolean>(_resolve => {
    const { stdout, catch: catching, kill } = execa(
      'code',
      ['-s', '--disable-extensions', '--disable-gpu']
    )
    const resolve = (out: any) => {
      kill()
      _resolve(out)
    }
    catching(() => resolve(false))
    if (stdout) {
      stdout.on('data', data => {
        if (isRunningOutput(data.toString())) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    } else {
      resolve(false)
    }
  })

}