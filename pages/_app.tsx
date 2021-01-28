import '../styles/globals.scss'

import { AppProps } from 'next/app'
import Router from 'next/router'
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
      <Component {...pageProps} />
      <PrivacyBanner />
    </ServiceProvider>
  )
}

export default MyApp
