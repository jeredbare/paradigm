import '../styles/globals.css'
import withDarkMode, { MODE } from 'next-dark-mode'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withDarkMode(MyApp, { defaultMode: MODE.DARK })
