import { runApp, IAppConfig } from 'ice';

if (process.env.NODE_ENV === 'development') {
  // only enables it in DEV mode
  import('mincu-debug').then(({ default: debugModule }) => {
    debugModule.applyConsole()
  })
}

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
};

runApp(appConfig);
