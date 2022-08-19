import '../styles/globals.css'

import { ReadySSR } from "mincu-react"
import { Fallback } from "mincu-react-demo-shared"

export default function App({ Component, pageProps }) {
  return <ReadySSR fallback={<Fallback />}><Component {...pageProps} /></ReadySSR>
}
