import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import 'allotment/dist/style.css'
import 'simplebar/src/simplebar.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'

ReactDOM.createRoot(document.getElementById('app')!).render(<App />)
