import '../styles/globals.scss'

import { AppProps } from 'next/app'
import Router from 'next/router'
import Head from 'next/head'
import NProgress from 'nprogress'

import { container, containerModule } from 'services/container'
import { ServiceProvider } from 'services/provider'
import PrivacyBanner from 'components/PrivacyBanner'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

container.load(containerModule)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ServiceProvider container={container}>
      <Head>
        <meta charSet='utf-8' />
        <script async defer data-domain='longwintershadows.com' src='https://plausible.io/js/plausible.js'></script>
      </Head>
      <Component {...pageProps} />
      <PrivacyBanner />
    </ServiceProvider>
  )
}

export default MyApp
