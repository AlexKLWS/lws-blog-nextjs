import '../styles/globals.scss'

import { AppProps } from 'next/app'
import Router from 'next/router'
import Head from 'next/head'
import NProgress from 'nprogress'

import { container, containerModule } from 'services/container'
import { ServiceProvider } from 'services/provider'
import PrivacyBanner from 'components/PrivacyBanner'
import { DEFAULT_AUTHOR_NAME, DEFAULT_DESCRIPTION, DEFAULT_TITLE, OPEN_GRAPH_IMAGE } from 'consts/metaDefaults'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

container.load(containerModule)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ServiceProvider container={container}>
      <Head>
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
        <title>{`${DEFAULT_TITLE} - ${DEFAULT_AUTHOR_NAME}`}</title>
        <meta property='og:title' content={DEFAULT_TITLE} />
        <meta property='og:description' content={DEFAULT_DESCRIPTION} />
        <meta name='description' content={DEFAULT_DESCRIPTION} />
        <meta property='og:type' content='website' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:width' content='1200' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='og:image' content={OPEN_GRAPH_IMAGE} />
        <meta name='twitter:image' content={OPEN_GRAPH_IMAGE} />
        <meta property='vk:image' content={OPEN_GRAPH_IMAGE} />
        <script async defer data-domain='longwintershadows.com' src='https://plausible.io/js/plausible.js'></script>
      </Head>
      <Component {...pageProps} />
      <PrivacyBanner />
    </ServiceProvider>
  )
}

export default MyApp
