import 'styles/globals.css'
import 'styles/tweet.css'
import AppLayout from 'components/AppLayout'

function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
