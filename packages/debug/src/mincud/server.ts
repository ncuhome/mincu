import WebSocket, { Data } from 'ws';
import chalk from 'chalk'
import { DEBUG_PORT, Received } from './shared'
import { logToConsole } from './logToConsole';
import { Decode } from 'console-feed-node-transform';
import { startDevTool } from 'mincu-debug-tools/server';
import { openUrl, Platform } from './commands'

const formatMessage = (message: Data) => {
  const str = message.toString()
  return JSON.parse(str) as Received
}

const logLogo = () => {
  console.log(chalk.cyan(`
  ****     **** ** ****     **   ******  **     **
  /**/**   **/**/**/**/**   /**  **////**/**    /**
  /**//** ** /**/**/**//**  /** **    // /**    /**
  /** //***  /**/**/** //** /**/**       /**    /**
  /**  //*   /**/**/**  //**/**/**       /**    /**
  /**   /    /**/**/**   //****//**    **/**    /**
  /**        /**/**/**    //*** //****** //******* 
  //         // // //      ///   //////   ///////  
            Welcome to MINCU Damon!
        !Fast - !Scalable - !Integrated
  
        Mincud listening on ws://localhost:${DEBUG_PORT}
  `))


  console.log(`
> Press "r" | Reload the client page
> Press "d" | Toggle the client devtool
  `)
}

const startWebSocketServer = () => {

  const wss = new WebSocket.Server({ port: DEBUG_PORT });

  wss.on('connection', (ws) => {
    ws.on('message', message => {
      const { type, level, data } = formatMessage(message)
      if (data.length === 0) return
      if (type === 'log') {
        logToConsole(level, Decode(data))
      }
      if (type === 'command') {
        // ['openUrl', 'url', 'platform']
        if (data[0] === 'openUrl') {
          openUrl(data[1], data[2] as Platform)
        }
      }
    });
  });

  wss.on('error', (err) => {
    console.log(err)
  })

  logLogo()

  return wss
}

export const startServer = () => {
  startDevTool()
  // @TODO: integrate with vscode-extension
  // isVsCodeRunning().then(isRunning => {
  //   if (isRunning) {
  //     // TODO: add detail doc url
  //     console.log('Note: You can use the Mincu Debugger')
  //   } else {
  //   }
  // })

  return startWebSocketServer()
}