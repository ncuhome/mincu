import WebSocket, { Data } from 'ws';
import chalk from 'chalk'
import { DEBUG_PORT, LogLevel } from './shared'
import { logToConsole } from './logToConsole';
import { Decode } from 'console-feed-node-transform';

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
        logToConsole(level, Decode(data))
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
  
        listening on ws://localhost:${DEBUG_PORT}
  `))

  console.log(`
> Press "r" | Reload the client page
> Press "d" | Toggle the client devtool
  `)

  return wss
}