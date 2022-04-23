import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className='container mx-auto py-4'>
        <Header />
        <div className='p-10'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default MyApp
