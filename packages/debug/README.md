# mincu-debug

[Mincu - 南大家园 WEB JS API](https://github.com/ncuhome/mincu)

# mincu-data

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
  

To reload the client page press "r"
To toggle the client devtool press "d"
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