import type { AppProps } from 'next/app'
import 'styles/globals.css'
import Header from 'components/UI/header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
