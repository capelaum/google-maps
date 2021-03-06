import { MapProvider } from 'contexts/mapContext'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'styles/globals.scss'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MapProvider>
        <Component {...pageProps} />
      </MapProvider>
    </QueryClientProvider>
  )
}

export default MyApp
