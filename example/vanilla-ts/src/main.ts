import './style.css'

if (import.meta.env.DEV) {
  // only enables it in DEV mode
  import('mincu-debug').then(({ default: debugModule }) => {
    debugModule.applyConsole()
  })
}

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
