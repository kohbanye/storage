import type { AppProps } from 'next/app'
import { css } from '@emotion/react'
import 'styles/globals.css'
import { headerHeight } from 'styles/globals'
import Header from 'components/UI/header'
import Sidebar from 'components/UI/sidebar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div css={container}>
      <Header />
      <div css={body}>
        <Sidebar />
        <div css={main}>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  )
}

const container = css`
  display: grid;
  grid-template-rows: min-content 1fr;
  overflow: hidden;
  height: 100vh;
`
const body = css`
  display: grid;
  grid-template-columns: min-content 1fr;
`
const main = css`
  overflow-y: auto;
  height: calc(100vh - ${headerHeight});
`

export default MyApp
