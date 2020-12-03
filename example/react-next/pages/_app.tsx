import initReactFastclick from 'react-fastclick';
initReactFastclick();

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}