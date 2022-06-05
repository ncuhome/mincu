import { createRoot } from 'react-dom/client'
import { App } from './app'
import 'virtual:windi.css'

const root = createRoot(document.getElementById('app')!)
root.render(<App />)