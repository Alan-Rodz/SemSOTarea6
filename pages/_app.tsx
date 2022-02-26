import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SistemaOperativoProvider } from '../context/SistemaOperativoProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SistemaOperativoProvider>
      <Component {...pageProps} />
    </SistemaOperativoProvider>
  )
}

export default MyApp;
