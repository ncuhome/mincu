import concurrently from 'concurrently'
import path from 'path'
import WebSocket, { Data } from 'ws';
import chalk from 'chalk'
import { DEBUG_PORT, LogLevel } from './shared'
import { logToConsole } from './logToConsole';

const args = process.argv.slice(2)

const SERVER_BIN = path.join(__filename)

const CON_OPTS: concurrently.Options = {
  raw: true
}

type RecvType = 'log'

interface Received {
  type: RecvType
  level: LogLevel,
  data: string[]
}

const formatMessage = (message: Data) => {
  const str = message.toString()
  return JSON.parse(str) as Received
}

export const startServer = () => {

  const wss = new WebSocket.Server({ port: DEBUG_PORT });

  wss.on('connection', (ws) => {
    ws.on('message', message => {
      const { type, level, data } = formatMessage(message)
      if (type === 'log' && data.length > 0) {
        logToConsole(level, data)
      }
    });
  });

  wss.on('error', (err) => {
    console.log(err)
  })

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
  
        listening on ws://localhost:2333
  `))
}

export const startCli = () => {
  concurrently(
    [`node -e "require('${SERVER_BIN}').startServer()"`, ...args],
    CON_OPTS
  )
}