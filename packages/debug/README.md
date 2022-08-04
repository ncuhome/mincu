# mincu-debug

[![npm install size](https://packagephobia.com/badge?p=mincu-debug)](https://packagephobia.com/result?p=mincu-debug)

[Mincu - 南大家园 WEB JS API](https://github.com/ncuhome/mincu)

## Install

```cmd
$ yarn add -D mincu-debug
# or
$ npm install -save-dev mincu-debug 
```

## Usage

```cmd
$ npx mincud

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
  

> Press "r" | Reload the client page
> Press "d" | Toggle the client devtool
```

```cmd
$ npx mincud -h

  Usage
    $ mincud <command> [options]

  Options
    --no-qrcode, Disable qrcode generation
    --no-server-command, Disable handling server command

  Examples
    $ mincud 'npm run dev'
```

## Thanks

- [react-native/cli](https://github.com/react-native-community/cli), [metro](https://github.com/facebook/metro)
- [expo/expo-cli](https://github.com/expo/expo-cli)