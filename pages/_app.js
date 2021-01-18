import '../styles/globals.scss'
import { container, containerModule } from 'services/container'
import { ServiceProvider } from 'services/provider'

container.load(containerModule)

function MyApp({ Component, pageProps }) {
  return (
    <ServiceProvider container={container}>
      <Component {...pageProps} />
    </ServiceProvider>
  )
}

export default MyApp
