import './style.css'

if (import.meta.env.DEV) {
  // only enables it in DEV mode
  import('mincu-debug').then(({ default: debugModule }) => {
    debugModule.applyConsole()
  })
}

const fakePromise = () => new Promise((_, reject) => {
  reject(new Error('fake error'))
})

const a = async () => {
  const res = await fakePromise()
  console.log(res)
}

setTimeout(() => {
  a()
}, 1000)

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
