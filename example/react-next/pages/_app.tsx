import { ReadySSR } from "mincu-react"
import Outside from './outside'

export default function App({ Component, pageProps }) {
  return <ReadySSR fallback={<Outside />}><Component {...pageProps} /></ReadySSR>
}
